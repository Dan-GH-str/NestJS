import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiResponse } from "@nestjs/swagger";


@Controller()
export class AppController {
    constructor(private readonly AppSevice: AppService) {}

    @Get()
    @ApiResponse({ status: 200, type: String, description: 'The microservice will handle this event by sending a message' })
    sendMessage() {
        this.AppSevice.sendMessage()
    }
}