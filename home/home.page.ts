import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Items } from 'src/Tabels/tabels-list';
import { AuthService } from '../Service/auth.service';
import { ItemsService } from '../Service/items.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	listOfItems: Items[];
	searchText: string;
	filteredItemsSearch: any;
	public subscription: any;
	constructor(private authServices: AuthService, private router: Router,
		private alertCtrl: AlertController, private itemsService: ItemsService,
		private platform:Platform) { }
	ngOnInit() {
		this.itemsService.getAllItem().subscribe(res => {
			this.listOfItems = res;
		})
	}
	ionViewDidEnter() {
		this.subscription = this.platform.backButton.subscribe(() => {
		  navigator['app'].exitApp();
		});
	  }
	
	  ionViewWillLeave() {
		this.subscription.unsubscribe();
	  }
	filter(query) {
		this.filteredItemsSearch = (query.target.value) ?
		  this.listOfItems.filter(p => p.name.toLowerCase().includes(query.target.value.toLowerCase())) :
		  this.listOfItems;
	  }
	async logOut(): Promise<void> {
		this.authServices.logOutUser().

			then(
				() => {
					localStorage.setItem("userId", null)
					this.router.navigateByUrl('login');

				},
				async error => {
					const alert = await this.alertCtrl.create({
						message: error.message,
						buttons: [{ text: 'ok', role: 'cancel' }],
					});
					await alert.present();
				}

			);
	}
}
