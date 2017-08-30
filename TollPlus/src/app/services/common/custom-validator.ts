import { FormControl} from "@angular/forms";
export class CustomValidator {

  static validatePhoneNumber(control: FormControl): { [key: string]: any }{
    // validate phone numbers of format "1234567890"
    if (control.value) {
      if (control.value.match('\\d{10}')) {return null; }
      // validating phone number with -, . or spaces
      else if (control.value.match('\\d{3}[-\\.\\s]\\d{3}[-\\.\\s]\\d{4}')){return null; }
      // validating phone number with extension length from 3 to 5
      else if (control.value.match('\\d{3}-\\d{3}-\\d{4}\\s(x|(ext))\\d{3,5}')) {return null; }
      // validating phone number where area code is in braces ()
      else if (control.value.match('\\(\\d{3}\\) \\d{3}-\\d{4}')) {return null; }
      // return false if nothing matches the input
      else {
        return {'invalidPhoneNumber': true};
      }

    }


  }
}
