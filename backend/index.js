import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

const dbUtil = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "48508hbt",
    database: "voa_database"
})

app.get("/", (req,res)=>{
    res.json("backend")
})

app.get("/show", (req,res)=>{
    const q = "SELECT * FROM hzb_show"
    dbUtil.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/store", (req,res)=>{
    const q = "SELECT * FROM hzb_store"
    dbUtil.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/attraction", (req,res)=>{
    const q = "SELECT * FROM hzb_attract"
    dbUtil.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/show", (req,res)=>{
    //const q = "INSERT INTO hzb_show (`name`, `description`, `type`, `s_time`, `e_time`, `wchair_access`, `price`) VALUES (?)"
    const q = "INSERT INTO hzb_show (`name`, `description`, `type`, `s_time`, `e_time`, `wchair_access`, `price`) VALUES (?)";
    //const values = ['test name','test desc','Musical','2023-04-09', '2023-04-09', '1',10];
    const values = [
        req.body.name,
        req.body.description,
        req.body.type,
        req.body.s_time,
        req.body.e_time,
        req.body.wchair_access,
        req.body.price
    ];

    dbUtil.query(q,[values], (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})

app.post("/store", (req,res)=>{
    const q = "INSERT INTO hzb_store (`name`, `category`, `description`, `menu_item`, `unit_price`) VALUES (?)";
    //const values = ['tname','Food Stall','tdesc','tmenu',1]
    const values = [
        req.body.name,
        req.body.category,
        req.body.description,
        req.body.menu_item,
        req.body.unit_price
    ];

    dbUtil.query(q,[values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("store insert succ")
    });
})

app.post("/attraction", (req,res)=>{
    const q = "INSERT INTO hzb_attract (`name`, `description`, `type`, `status`, `cpacity`, `min_height`, `duration`, `section`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.description,
        req.body.type,
        req.body.status,
        req.body.cpacity,
        req.body.min_height,
        req.body.duration,
        req.body.section
    ];

    dbUtil.query(q,[values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("attraction insert succ")
    });
})


app.delete("/store/:store_id", (req,res)=>{
    const storeItemId = req.params.store_id;
    const q = "DELETE FROM hzb_store WHERE store_id = ?"
    dbUtil.query(q, [storeItemId], (err, data)=>{
        if(err) return res.json(err)
        return res.json("store delete succ")
    })
})

app.delete("/attraction/:attract_id", (req,res)=>{
    const attractItemId = req.params.attract_id;
    const q = "DELETE FROM hzb_attract WHERE attract_id = ?"
    dbUtil.query(q, [attractItemId], (err, data)=>{
        if(err) return res.json(err)
        return res.json("attraction delete succ")
    })
})

app.delete("/show/:show_id", (req,res)=>{
    const showItemId = req.params.show_id;
    const q = "DELETE FROM hzb_show WHERE show_id = ?"
    dbUtil.query(q, [showItemId], (err, data)=>{
        if(err) return res.json(err)
        return res.json("show delete succ")
    })
})

app.put("/store/:store_id", (req,res)=>{
    const storeItemId = req.params.store_id;
    const q = "UPDATE hzb_store SET `name` = ?, `category` = ?, `description` = ?, `menu_item` = ?, unit_price = ? where store_id = ?";

    const values = [
        req.body.name,
        req.body.category,
        req.body.description,
        req.body.menu_item,
        req.body.unit_price
    ]
    dbUtil.query(q, [...values, storeItemId], (err, data)=>{
        if(err) return res.json(err)
        return res.json("store update succ")
    })
})

app.put("/attraction/:attract_id", (req,res)=>{
    const attractItemId = req.params.attract_id;
    const q = "UPDATE hzb_attract SET `name`=?, `description`=?, `type`=?, `status`=?, `cpacity`=?, `min_height`=?, `duration`=?, `section`=? where attract_id = ?";
    const values = [
        req.body.name,
        req.body.description,
        req.body.type,
        req.body.status,
        req.body.cpacity,
        req.body.min_height,
        req.body.duration,
        req.body.section
    ];
    dbUtil.query(q, [...values, attractItemId], (err, data)=>{
        if(err) return res.json(err)
        return res.json("attract update succ")
    })
})

app.put("/show/:show_id", (req,res)=>{
    const showItemId = req.params.show_id;
    const q = "UPDATE hzb_show SET `name`=?, `description`=?, `type`=?, `s_time`=?, `e_time`=?, `wchair_access`=?, `price`=? where show_id = ?";
    const values = [
        req.body.name,
        req.body.description,
        req.body.type,
        req.body.s_time,
        req.body.e_time,
        req.body.wchair_access,
        req.body.price
    ];
    console.log(values)
    dbUtil.query(q, [...values, showItemId], (err, data)=>{
        if(err) return res.json(err)
        return res.json("show update succ")
    })
})

app.listen(5500, ()=>{
    console.log("Connected to backend!")
})