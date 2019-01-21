import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  currentItems: Item[];

  constructor(public navCtrl: NavController, 
    formBuilder: FormBuilder, public viewCtrl: ViewController, public camera: Camera, public items: Items) {
      this.currentItems = this.items.query();
      this.form = formBuilder.group({
      itemPic: [''],
      name: ['', Validators.required],
      about: [''],
      categorie: [''],
      state: [''],
      price: [''],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'itemPic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'itemPic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getItemImageStyle() {
    return 'url(' + this.form.controls['itemPic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);  
  }

  createItem() {
    let item = {
      "name": this.form.controls['name'].value,
      "picture": this.form.controls['itemPic'].value,
      "about": this.form.controls['about'].value,
      "price": this.form.controls['price'].value,
    };
    this.items.add(item);
  }
}
