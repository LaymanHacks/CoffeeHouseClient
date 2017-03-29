import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const RATING_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RatingStarsComponent),
  multi: true
};

@Component({
  selector: 'rating-stars',
  templateUrl: 'ratingstars.component.html',
  providers: [RATING_CONTROL_VALUE_ACCESSOR]
})
export class RatingStarsComponent implements ControlValueAccessor{

  range: Array<Number>;
  //The internal data model
    private innerValue: any = '';

    //Placeholders for the callbacks which are later providesd
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

  ngOnInit() {
    let states: Array<number> = [];
    for (let i = 0; i < 5; i++) {
      if (this.innerValue > i && this.innerValue < i + 1) {
        states[i] = 2;

      } else if (this.innerValue > i) {
        states[i] = 1;

      } else {
        states[i] = 0;
      }
    }

    this.range = states;
  }



    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}

