import {Pipe, PipeTransform} from '@angular/core';

import {TranslationService} from '../services/translation.service';

@Pipe({
	name: 'translate',
	pure: true
})
export class TranslatePipe implements PipeTransform {
	constructor(private translation: TranslationService) {
	}

	transform(value: any, args?: string): any {
		if (this.translation.currentLanguage !== 'en') {
			if (value) {
				return this.translation.translate(value);
			}
		} else {
			return value;
		}
	}
}