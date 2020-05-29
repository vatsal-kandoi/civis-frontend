import {
BehaviorSubject,
Observable,
AsyncSubject
} from 'rxjs';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpClient} from '@angular/common/http';
import {Resolve, ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import { HindiLang } from '../../shared/models/constants/transalation.json';


interface Dictionary {
text: string;
translation: string;
}

@Injectable({
    providedIn: 'root'
})
export class TranslationService implements Resolve<any>, CanActivate {
translateUrl = 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyBvMWJrCycleLrwQS-ceeeYC61K0fGbsE0';
loading: AsyncSubject<boolean> = new AsyncSubject();

currentLanguage: string;
dictionary: BehaviorSubject<Array<Dictionary>> = new BehaviorSubject([]);
environment: any;

constructor(
        private _cookieService: CookieService,
        private storage: LocalStorageService,
        private http: HttpClient,

) {

    const currentLanguage = this._cookieService.get('civisLang');
    // const version = this.storage.retrieve('lang_version');

    if (currentLanguage) {
        console.log(currentLanguage, 'afafa');
        this.currentLanguage = currentLanguage;

        if (this.storage.retrieve('lang')) {
            this.dictionary.next(this.storage.retrieve('lang'));
            this.setIndex();
        } else {
            this.dictionary.next(HindiLang);
            this.storage.store('lang', HindiLang);
            // this.storage.store('lang_version', data.translation);
            this.setIndex();
        }
    } else {
        this.currentLanguage = 'en';
        this.loading.next(true);
        this.loading.complete();
    }
}

canActivate() {
    console.log('can active');
    return this.loading;
}

resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.loading;
}

// getVersion() {
//     return this.http.get(`versions.json`);
// }


getLangJson(lang: string) {
    return this.http.get(
            `https://s3-eu-west-1.amazonaws.com/cdn.expa.aiesec.org/translations/${lang}.json`
    );
}

setLanguage(key: string) {
    let obs = Observable.create(observer => {
        this.getLangJson(key).subscribe(
                (res: any) => {
                    this.storage.store('lang', res);
                    this.setIndex();
                    observer.next(res);
                    observer.complete();
                },
                error => {
                    observer.error(error);
                    observer.complete();
                }
        );
    });
    return obs;
}

setIndex() {
    this.loading.next(true);
    this.loading.complete();
}

translateUserData(userData: any) {
    if (this.currentLanguage !== 'en') {
        userData.profile.backgorunds = this.translateArrays(
                userData.profile.backgrounds,
                'name'
        );
        userData.profile.languages = this.translateArrays(
                userData.profile.languages,
                'name'
        );
        userData.profile.skills = this.translateArrays(
                userData.profile.skills,
                'name'
        );
        return userData;
    }
    return userData;
}

translate(text: string) {
    if (typeof text !== 'string') {
        return text;
    }

    const length = this.dictionary.value.length;

    return this.binarySearch(this.dictionary.value, text.toLowerCase(), 0, length) || text;

}

binarySearch(arr: Array<Dictionary>, text: string, start: number, end: number) {

    const mid = Math.floor((start + end) / 2);

    if (start > end) {
        return null;
    }

    if (start === end) {
        if (arr[start] && arr[start].text.toLowerCase() === text) {
            return arr[start].translation;
        } else {
            return null;
        }
    }

    if (arr[start] && arr[start].text.toLowerCase() === text) {
        return arr[start].translation;
    }

    if (arr[end] && arr[end].text.toLowerCase() === text) {
        return arr[end].translation;
    }

    if (arr[mid] && arr[mid].text.toLowerCase() === text) {
        return arr[mid].translation;
    }

    if (arr[mid].text.toLowerCase() > text) {
        return this.binarySearch(arr, text, start, mid - 1);
    } else {
        return this.binarySearch(arr, text, mid + 1, end);
    }
}

translateArrays(values: any, args: string) {
    if (this.currentLanguage !== 'en') {
        if (values) {
            let translatedValues = [];
            for (let item of values) {
                let temp = this.translate(item[args]);
                item[args] = temp;
                translatedValues.push(item);
            }
            return translatedValues;
        }
    } else {
        return values;
    }
}

translateGoogle(string, array) {
    let qString = string;
    let lang = this.currentLanguage;
    for (let item of array) {
        qString += '&q=' + item;
    }
    return this.http.get(`${this.translateUrl}&target=${lang}&q=${qString}`);
}
}
