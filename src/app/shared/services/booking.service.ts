import { Injectable } from "@angular/core";

import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Booking } from "../models/booking.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BookingService {
  private bookingCollection: AngularFirestoreCollection<Booking>;
  bookingDocument: AngularFirestoreDocument<Booking>;
  bookings: Observable<Booking[]>;
  booking: Observable<Booking>;

  constructor(private afs: AngularFirestore) {
    this.bookingCollection = this.afs.collection("appointments");
  }

  getBooking(): Observable<Booking[]> {
    var catogeryRef = this.afs.collection<Booking>("appointments");

    return (this.bookings = catogeryRef.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Booking;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    ));
  }

  getBookingByUid(uid: string) {
    var orderRef = this.afs.collection<Booking>("appointments", ref =>
      ref.where("userId", "==", uid).orderBy("creationDate", "desc")
    );

    return (this.bookings = orderRef.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Booking;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    ));
  }

  getBookingById(id: string): Observable<Booking> {
    var bookingDocument: AngularFirestoreDocument<Booking>;
    bookingDocument = this.afs.doc(`appointments/${id}`);
    return bookingDocument.valueChanges();
  }
  setBooking(booking: Booking) {
    if (!booking.id) {
      booking.id = this.afs.createId();
    }
    booking.creationDate = new Date();
    console.log("setBooking()=>", booking);
    return this.bookingCollection.doc(booking.id).set(booking, { merge: true });
  }
  getLatestBookingId() {
    var invoiceRef = this.afs.collection<Booking>("appointments", ref =>
      ref.orderBy("creationDate", "desc").limit(1)
    );

    // var invoiceRef = this.afs.collection<Booking>("appointments", ref =>
    //   ref.orderBy("creationDate", "desc").limit(1)
    // );
    return invoiceRef.valueChanges().pipe(
      map(data => {
        return data[0];
      })
    );
  }
}
