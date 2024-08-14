import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { options } from './microservice/microservice.options';

@Injectable()
export class AppService {
    private client: ClientProxy

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options
        })
    }

    sendMessage() {
        this.client.emit('Message', 'New Order')
        return 'Message sent!'
    }
}