import { Injectable } from '@angular/core';
import { Branch } from '../models/branches.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  branches: Branch[] = [
    {
    id: 1,
    name: 'Food Appeal – רמת גן',
    address: 'ביאליק 76, קניון ביאליק',
    city: 'רמת גן',
    phone: '03-5288556',
    openingHours: '9:00-22:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 2,
    name: 'Food Appeal – פרימיום סנטר',
    address: 'פרימיום סנטר',
    city: 'חולון',
    phone: '03-5288557',
    openingHours: '9:00-21:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 3,
    name: 'Food Appeal – בני ברק',
    address: 'רבי עקיבא 88',
    city: 'בני ברק',
    phone: '03-5288487',
    openingHours: '9:00-21:00 (ראשון-חמישי), 9:00-12:00 (שישי)',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 4,
    name: 'Food Appeal – רימונים',
    address: 'מרכז מסחרי רימונים',
    city: 'בני ברק',
    phone: '03-52656595',
    openingHours: '9:00-21:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 5,
    name: 'Food Appeal – יוספטל 92 (קניון בת־ים)',
    address: 'יוספטל 92',
    city: 'בת ים',
    phone: '03-5288447',
    openingHours: '9:00-21:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 6,
    name: 'Food Appeal – הכיכר',
    address: 'הכיכר',
    city: 'פתח תקווה',
    phone: '03-5288446',
    openingHours: '9:00-21:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 7,
    name: 'Food Appeal – עופר הקניון הגדול',
    address: 'עופר הקניון הגדול',
    city: 'פתח תקווה',
    phone: '03-5288446',
    openingHours: '10:30-22:30',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 8,
    name: 'Food Appeal – עופר סירקין',
    address: 'עופר סירקין',
    city: 'פתח תקווה',
    phone: '03-5288447',
    openingHours: '9:30-21:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 9,
    name: 'Food Appeal – קניון ערים',
    address: 'קניון ערים',
    city: 'כפר סבא',
    phone: '03-5288446',
    openingHours: '9:30-21:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 10,
    name: 'Food Appeal – מתחם G',
    address: 'מתחם G',
    city: 'כפר סבא',
    phone: '03-5288447',
    openingHours: '11:00-21:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 11,
    name: 'Food Appeal – עופר השרון',
    address: 'עופר השרון',
    city: 'נתניה',
    phone: '03-5288447',
    openingHours: '9:00-23:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 12,
    name: 'Food Appeal – קניון עיר ימים',
    address: 'קניון עיר ימים',
    city: 'נתניה',
    phone: '03-5288447',
    openingHours: '9:00-21:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 13,
    name: 'Food Appeal – קניון הכפר',
    address: 'קניון הכפר',
    city: 'כפר יונה',
    phone: '08-922-4444',
    openingHours: '9:00-21:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 14,
    name: 'Food Appeal – שפיר סנטר',
    address: 'שפיר סנטר',
    city: 'ראשון לציון',
    phone: '03-5288447',
    openingHours: '10:00-23:30',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 15,
    name: 'Food Appeal – עופר רחובות',
    address: 'עופר רחובות',
    city: 'רחובות',
    phone: '08-922-4444',
    openingHours: '9:30-21:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 16,
    name: 'Food Appeal – גלובוס סנטר',
    address: 'גלובוס סנטר',
    city: 'אזור אשקלון',
    phone: '08-922-4444',
    openingHours: '9:00-22:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 17,
    name: 'Food Appeal – ירושלים (קניון הדר)',
    address: 'קניון הדר',
    city: 'ירושלים',
    phone: '02-673-4444',
    openingHours: '9:30-22:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 18,
    name: 'Food Appeal – שדרות וייצמן 4',
    address: 'וייצמן 4',
    city: 'שדרות',
    phone: '08-622-4444',
    openingHours: '9:00-21:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 19,
    name: 'Food Appeal – מול החוף וילג\'',
    address: 'מול החוף וילג\'',
    city: 'חדרה',
    phone: '09-876-4444',
    openingHours: '9:00-21:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 20,
    name: 'Food Appeal – עופר לב חדרה',
    address: 'עופר לב חדרה',
    city: 'חדרה',
    phone: '09-876-4444',
    openingHours: '9:00-21:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  },
  {
    id: 21,
    name: 'Food Appeal – צים אורבן',
    address: 'צים אורבן',
    city: 'נתיבות',
    phone: '08-922-4444',
    openingHours: '9:00-21:00',
    imgUrl: 'assets/images/media_07062023144314.png',
  }
  ];

  getAllBranches(): Branch[] {
    return this.branches;
  }
  private apiUrl = 'https://www.foodappeal-online.com/page/%D7%90%D7%99%D7%AA%D7%95%D7%A8-%D7%97%D7%A0%D7%95%D7%AA';

  constructor(private http: HttpClient) {}

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiUrl);
  }

  getBranch(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.apiUrl}/${id}`);
  }
}

