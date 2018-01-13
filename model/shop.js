const AV = require('../utils/av-weapp-min');
class shop extends AV.Object {
 

  get content() {
    return this.get('content');
  }
  set content(object) {
    this.set('content', object);
  }


}

AV.Object.register(shop, 'shop');
module.exports = shop;