import json
from channels.generic.websocket import AsyncWebsocketConsumer
from base.models import Cart_Product
from asgiref.sync import sync_to_async
from base.serializers import CartSerializer
class Cart(AsyncWebsocketConsumer):
    async def connect(self):
        print("CONN")
        await self.accept()
    async def disConnect(self, close_code):
        print("DIS")
        pass
    async def receive(self,text_data):
        text_data_json = json.loads(text_data)
        Cart =  await sync_to_async(Cart_Product.objects.filter)(user_id=text_data_json['message'])
        print(Cart , "CART")
        serializer = CartSerializer(Cart, many=True)
        await self.send(text_data=json.dumps({
            'message':serializer.data
        }))
    