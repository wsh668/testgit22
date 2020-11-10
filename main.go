package main

import (
	_ "github.com/go-sql-driver/mysql"
	"test4/common"
	"xorm.io/xorm"
	"xorm.io/xorm/names"
)

type UserTable struct {
	UserId int `xorm:"pk autoincr"`  //主键 自增
	UserName string `xorm:"varchar(32)"`
	UserAge int `xorm:"default 0"`  //设置默认值为0
	//UserSex int `xorm:"index"`//设置sex为索引阿松大
}


var engine *xorm.Engine

func main() {
	//DATABASE BASH
	engine = common.InitDB()

	//如果修改了结构体，比如增加了某一字段，不会改变原有数据，只会在数据库增加一列asdasdasda
	engine.SetMapper(names.SnakeMapper{})
	engine.Sync2(new(UserTable))

	//userTable :=new(UserTable)

	//var userTable [] UserTable

	//userTable := make(map[int64]UserTable)


	 //《===========================查询数据=============================》
 	//使用get只能获取一条数据
	//通过ID去查询
	//engine.ID(1).Get(userTable)
	//通过where条件查询
	//engine.Where("user_id=? and user_name=?", 1,"wsh").Get(userTable)
	//engine.Where("user_name=?", "wsh").Get(userTable)
	//使用find可以查询多条记录
	//engine.Where("user_name=?", "wsh").Find(&userTable)

	//可以使用And去添加条件
	//engine.Where("user_name=?", "wsh").And("user_id=?",1).Find(&userTable)

	//可以使用or去添加条件
	//engine.Where("user_id=?", 2).Or("user_id=?",1).Find(userTable)

	//可以使用原生的sql语句，支持like模糊查询
	//engine.SQL("select * from user_table where user_name like '辉%'").Find(&userTable)

	//排序查询默认是升序，并且是查询整个表
	//engine.OrderBy("user_id").Find(&userTable)
	//降序就加desc
	//engine.OrderBy("user_id desc").Find(&userTable)
	//加条件
	//engine.Where("user_name=?","wsh").OrderBy("user_id desc").Find(&userTable)

	//通过限制只查询某几列的数据,其他不需要的列就是都会为0
	//engine.Cols("user_age").OrderBy("user_age desc").Find(&userTable)

	//统计数据总数
	//total, err := engine.Count(userTable)
	//if(err == nil){
	//	fmt.Println(total)
	//}
	//fmt.Println(userTable)

	//《===================插入数据=========================》
	//插入一条数据
	//insertUser := UserTable{
	//	UserName: "zxl",
	//	UserAge: 27,
	//}
	//rowNum,err := engine.Insert(&insertUser)
	//if(err == nil){
	//	fmt.Println(rowNum)
	//}
	//fmt.Println(insertUser)

	//批量插入多条数据,如插入3条
	//insUsers := make([] UserTable,3)
	//insUsers[0].UserName= "qq"
	//insUsers[0].UserAge=1
	//insUsers[1].UserName= "ww"
	//insUsers[1].UserAge=2
	//insUsers[2].UserName= "ee"
	//insUsers[2].UserAge=3
	//
	//rowNum, err :=engine.Insert(insUsers)
	//if(err == nil){
	//	fmt.Println(rowNum)
	//}

    //《=============================更新数据=============================》

}




// search through query
//func query() {
//	sql := "select * from student"
//	results, err := engine.QueryString(sql)
//
//	if err != nil {
//		log.Fatal("query error ", err)
//	}
//	totle := len(results)
//	if totle == 0 {
//		fmt.Println("no data")
//	}else {
//		for i, data := range results{
//			fmt.Printf("%d = %v\n" , i, data)
//			fmt.Println(data)
//		}
//	}
//}

