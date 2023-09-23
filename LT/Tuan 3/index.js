const express = require('express')
const app = express()
const ehs = require('express-handlebars')

app.engine('handlebars', ehs.engine({defaultLayout: 'main',
    helpers: {
        table: function(n,m) {
            var html = '<table style="width: 100%" border ="1">';
            for(var i = 0; i<n;i++){
                html+= '<tr>';
                for(var j = 0; j<m;j++){
                    html+=`<td>${i+j}</td>`;
                }
                html+= '</tr>'
            }
            html+= '</table>'
            return html;
        },
        for: function(start, end, options) {
            var result = ''
            for(var i = start; i<=end; i++)
            {
                result+= options.fn(parseInt(i))
            }
            return result;
        }
    }
}))
app.set('view engine', "handlebars")
app.use(express.static('public'))
app.get("/", (req, res) => {
    res.render('home')
})
app.get("/loop", (req, res) => {
    res.render('for')
})
var object = {
    name: "Iphone 16",
    price: 19000,
    img: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwhZbz_l_m9-7kYAT9tI0QvncVoiD6aF4UohGGpO6iBKrATjZ-J2Ntu5DEvDuhwg0VN8Y&usqp=CAU", 
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRFJsP7vrrL-_C4Zbn1sSfjWW-3QS0UuF6sw&usqp=CAU", 
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu6cQOhjH0ejbm_3ZE1NcT4_QDfygN54XZHg&usqp=CAU"],

    desc: "A exorbitant product for the higher-ranking class in society, everyone must acrue for a long time to buy it",
    vars: {
        product1: {
            name: "IP 07 ",
            price: 7800000
        },
        product2: {
            name: "IP 15 ",
            price: 6500000
        }
    }
}

app.get("/products", (req,res) => {
    res.render("products", {product: object})
})
app.listen(8080, (console.log("Running")))
