import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { ICartItem } from 'src/app/interfaces/ICartItem';
import { StorageService } from 'src/app/services/storage.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from 'src/environments/enviroment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export default class CartComponent {
  constructor(
    private messageService: MessageService,
    private storageService: StorageService,
    private modalService: NgbModal,
  ){}

  public payPalConfig ? : IPayPalConfig;
  cartItems: ICartItem[] = []
  total = 0

  ngOnInit(): void {
    this.initConfig()
    this.total = 0
    if(this.storageService.existsCart()){
      this.cartItems = this.storageService.getCart()
      this.cartItems.forEach((item) => {
        this.total += item.productPrice * item.quantity
      })
    }
    this.getItem()
  }

  getItem(){
    this.messageService.getMessage().subscribe((product) => {
      let exists = false 
      this.total += product.price
      this.cartItems.forEach((item) => {
        if(item.productId === product.id){
          exists = true
          item.quantity++
        }
      })
      if(!exists){
        const cartItem: ICartItem = {
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          quantity: 1
        }
        this.cartItems.push(cartItem)
      }
      this.storageService.setCart(this.cartItems)
    })
  }

  emptyCart(): void {
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
  }

  deleteItem(id: number){
    if(this.cartItems[id].quantity > 1){
      this.total -= this.cartItems[id].productPrice
      this.cartItems[id].quantity--
    }else{
      this.total -= this.cartItems[id].productPrice
      this.cartItems.splice(id, 1)
    }
    this.storageService.setCart(this.cartItems)
  }
  
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'BRL',
        clientId: environment.clientId,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'BRL',
                    value: this.total.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'BRL',
                            value: this.total.toString()
                        }
                    }
                },
                items: this.getItemsList()
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point',
          JSON.stringify(data));
          this.openModal(
            data.purchase_units[0].items,
            data.purchase_units[0].amount.value
          );
          this.emptyCart();
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);

        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
  }

  getItemsList(): any[] {
    const items: any[] = []
    this.cartItems.forEach((item) => {
      items.push({
        name: item.productName,
        quantity: item.quantity,
        unit_amount: {
          value: item.productPrice,
          currency_code: 'BRL'
        }
      })
    })
    return items
  }

  openModal(items: any, amount: any): void {
    const modalRef = this.modalService.open(ModalComponent)
    modalRef.componentInstance.items = items
    modalRef.componentInstance.amount = amount
  }

}