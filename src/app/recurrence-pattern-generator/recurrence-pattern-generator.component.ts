import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recurrence-pattern-generator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recurrence-pattern-generator.component.html',
  styleUrls: ['./recurrence-pattern-generator.component.css']
})
export class RecurrencePatternGeneratorComponent {
  // Add this line to expose Object to the template
  Object = Object;
  
  weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  pattern: string = 'daily';
  time: string = '12:00';
  date: string = '1';
  selectedDays: { [key: string]: boolean } = {
    monday: false, tuesday: false, wednesday: false,
    thursday: false, friday: false, saturday: false, sunday: false
  };
  description: string = '';

  ngOnInit() {
    this.generateDescription();
  }

/*

Create Recurrence Pattern Description Module that has the following functionalities
Complete the following functionalities.

1 .Renders recurrence pattern select field

2 .Shows daily pattern description with the selected time

Example:
Input:
Pattern: Daily
Time: 10:30 AM
Output: Runs every day at 10:30.

3. Displays weekly pattern description with selected days and time

Example:
Input:
Pattern: Weekly
Days Selected: Monday, Friday
Time: 08:30 AM
Output: Runs every week on Monday, Friday at 08:30.

4. Falls back to a generic weekly description when no days are selected

Example:
Input:
Pattern: Weekly
Days Selected: 'None'
Time: 06:30 PM
Output: Runs every week at 18:30.

5. Shows monthly pattern description with selected date and time

Example:
Input:
Pattern: Monthly
Date Selected: 15
Time: 09:00 AM
Output: Runs every month on the 15th day at 09:00.

6. Handles ordinal suffixes correctly (e.g., 1st, 2nd, 3rd, 11th, etc.)

NOTE: You are free to implement the task in any other way as well but shouldn't be hardcoded.

*/

  onPatternChange(value: string) {
    this.pattern = value;
    this.generateDescription();
  }

  onTimeChange(value: string) {
    this.time = value;
    this.generateDescription();
  }

  toggleDay(day: string) {
    this.selectedDays[day] = !this.selectedDays[day];
    this.generateDescription();
  }

  onDateChange(value: string) {
    this.date = value;
    this.generateDescription();
  }

  generateDescription() {
    const formattedTime = this.formatTime(this.time);

    if (this.pattern === 'daily') {
      this.description = `Runs every day at ${formattedTime}.`;
    } else if (this.pattern === 'weekly') {
      const selected = this.getDaysKeys();
      if (selected.length === 0) {
        this.description = `Runs every week at ${formattedTime}.`;
      } else {
        const daysString = selected.map(day => this.capitalize(day)).join(', ');
        this.description = `Runs every week on ${daysString} at ${formattedTime}.`;
      }
    } else if (this.pattern === 'monthly') {
      const suffix = this.ordinalSuffix(+this.date);
      this.description = `Runs every month on the ${this.date}${suffix} day at ${formattedTime}.`;
    }
  }

  getDaysKeys(): string[] {
    return Object.keys(this.selectedDays).filter(key => this.selectedDays[key]);
  }

  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  ordinalSuffix(day: number): string {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  formatTime(time: string): string {
    const [hourStr, minute] = time.split(':');
    let hour = +hourStr;
    const suffix = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, '0')}:${minute} ${suffix}`;
  }

}
