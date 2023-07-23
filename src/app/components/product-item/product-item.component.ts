import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/interfaces/IProduct';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: IProduct;
  constructor(
    private messageService: MessageService
  ) { }
  
  ngOnInit(): void {
    
  }

  addToCart(): void {
    console.log('sending...')
    this.messageService.sendMessage(this.product)
  }

}
