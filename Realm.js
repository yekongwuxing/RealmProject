var RealmBase = {};
import Realm from 'realm';
/**建表 */
 const HomeSchema = {
     name:'HomeData',
     primaryKey:'id',
     properties:{
         id:'int',
         title:'string',
         mall:'string',

     }
 }
/**建表 */
 const HTSchema = {
    name:'HTData',
    properties:{
        id:'int',
        title:'string',
        mall:'string'

    }
} 
/**初始化realm 可同时往数组中放入多个表 */
let realm = new Realm({schema:[HomeSchema,HTSchema]});

/**增加 */
RealmBase.create = function (schema,data) {
    realm.write(() => {
        for (let i = 0;i < data.length;i++){
            let temp = data[i];
            realm.create(schema,{id:temp.id,title:temp.title,mall:temp.mall})
        }
    })
}

/**查询全部数据 */
RealmBase.loadAll = function (schema) {
    return realm.objects(schema);
}
/**条件查询 */
RealmBase.filtered = function (schema,filtered) {
    //获取对象
    let objects = realm.objects(schema);
    //筛选
    let object = objects.filtered(filtered);
    if(object) {//有对象
        return object;
    }else{
        return '未找到数据';
    }
}
/**带主键更新某一条数据*/
RealmBase.updateData = function (schema,data) {
    realm.write(() => {
        let objects = realm.objects(schema);
        realm.create(schema,data,true);
    })
}
/**删除所有数据 */
RealmBase.removeAllData = function (schema) {
    realm.write(() => {
        //获取表中所以数据
        let objects = realm.objects(schema);
        //全部删除                                               
        realm.delete(objects);
    })
}
/**删除表中数据 */
RealmBase.removeData = function (schema,filtered) {
    realm.write(() => {
        let objects = realm.objects(schema);
        let object = objects.filtered(filtered);
        //删除该条数据
        realm.delete(object);
    })
}
export default RealmBase;
