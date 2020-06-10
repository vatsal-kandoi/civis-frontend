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

    if (currentLanguage) {
        this.currentLanguage = currentLanguage;

        if (this.storage.retrieve('lang')) {
            this.dictionary.next(this.storage.retrieve('lang'));
            this.setIndex();
        } else {
            const lang = HindiLang.sort(this.compare_text);
            this.dictionary.next(lang);
            this.storage.store('lang', lang);
            this.setIndex();
        }
    } else {
        this.currentLanguage = 'en';
        this.loading.next(true);
        this.loading.complete();
    }
}



compare_text(a, b) {
    // a should come before b in the sorted order
    if (a.text < b.text) {
            return -1;
    // a should come after b in the sorted order
    } else if (a.text > b.text) {
            return 1;
    // and and b are the same
    } else {
            return 0;
    }
}

canActivate() {
    console.log('can active');
    return this.loading;
}

resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.loading;
}


setIndex() {
    this.loading.next(true);
    this.loading.complete();
}



translate(text: string) {
    if (typeof text !== 'string') {
        return text;
    }

    const length = this.dictionary.value.length;

    return this.binarySearch(this.dictionary.value, text, 0, length) || text;

}

binarySearch(arr: Array<Dictionary>, text: string, start: number, end: number) {
    console.log(arr, 'Aray');

    const mid = Math.floor((start + end) / 2);

    if (start > end) {
        return null;
    }

    if (start === end) {
        if (arr[start] && arr[start].text === text) {
            return arr[start].translation;
        } else {
            return null;
        }
    }

    if (arr[start] && arr[start].text === text) {
        return arr[start].translation;
    }

    if (arr[end] && arr[end].text === text) {
        return arr[end].translation;
    }

    if (arr[mid] && arr[mid].text === text) {
        return arr[mid].translation;
    }

    if (arr[mid].text > text) {
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

}
