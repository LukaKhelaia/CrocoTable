import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

type WeekType = "I" | "II" | "III" | "IV";

interface LeaderboardItem {
  customerId: number;
  loginName: string;
  place: number;
  week: WeekType;
}


@Component({
  selector: 'app-actions',
  imports: [CommonModule, FormsModule],
  templateUrl: './actions.html',
  styleUrl: './actions.css'
})
export class Actions {
  @ViewChild('wheel', { static: false }) wheelRef!: ElementRef<HTMLDivElement>;

  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  rotation = 'rotate(0deg)';
  spinning = false;
  targetNumber = 0;
  currentRotation = 0;
  errorMessage = '';
 
  //Wheel logic
  spinWheel() {
    // check for invalid number
    if (this.targetNumber < 1 || this.targetNumber > 10) {
      this.errorMessage = ' სექტორი ვერ მოიძებნა.';
      return;
    }

    this.errorMessage = ''; 
    if (this.spinning) return;

    const wheel = this.wheelRef?.nativeElement;
    // Disable transition 
    if (wheel) {
      wheel.style.transition = 'none';
      wheel.offsetHeight; 
    }

    this.spinning = true;

    const segmentAngle = 360 / this.numbers.length;
    const targetIndex = this.numbers.indexOf(this.targetNumber);
    const randomExtraSpins = Math.floor(Math.random() * 3) + 5;
    const offset = 215;

 // Calculate the total rotation angle where the wheel should stop
    const stopAngle =
      randomExtraSpins * 360 -
      (targetIndex * segmentAngle + segmentAngle / 2) -
      offset;

    if (wheel) wheel.style.transition = 'transform 4s cubic-bezier(0.25, 1, 0.3, 1)';
    this.rotation = `rotate(${stopAngle}deg)`;
    this.currentRotation = stopAngle;

  // After spinning ends fix the rotation
    setTimeout(() => {
      if (wheel) wheel.style.transition = 'none';
      this.currentRotation = stopAngle % 360;
      this.rotation = `rotate(${this.currentRotation}deg)`;
      if (wheel) wheel.offsetHeight;
      this.spinning = false;
    }, 4500);
  }

   // --- Leaderboard logic ---
  leaderboard: LeaderboardItem[] = [];
  weekTypes: WeekType[] = ["I","II","III","IV"];
  selectedWeek: WeekType | "" = "";

  constructor() {
    this.generateLeaderboard();
  }


  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomString(length: number) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

generateLeaderboard() {
  this.leaderboard = [];

  this.weekTypes.forEach(week => {
    const weekUsers: LeaderboardItem[] = [];

    // Generate  users per week
    for (let i = 1; i <= 10; i++) {
      weekUsers.push({
        customerId: this.randomInt(1000, 9999),
        loginName: this.randomString(6),
        place: i, 
        week
      });
    }

    this.leaderboard.push(...weekUsers);
  });
}

// Filtered leaderboard
get filteredLeaderboard() {
  if (!this.selectedWeek) return this.leaderboard;

  const filtered = this.leaderboard.filter(item => item.week === this.selectedWeek);

  // Sort by place 
  return filtered.sort((a, b) => a.place - b.place);
}

  selectWeek(week: WeekType | "") {
    this.selectedWeek = week;
  }
}
