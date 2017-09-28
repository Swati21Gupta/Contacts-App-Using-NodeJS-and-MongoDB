var readline1 = require('readline');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/contdb";

var rl1 = readline1.createInterface({input: process.stdin,output: process.stdout});

//Getting choice of operation
rl1.question('What do you want to do?\n1.Add Contact\n2.View Contacts\n3.Delete Contact\n', (answer) => 
{
    switch(answer)
    {
        case '1':   
        addContacts();
        break;
        case '2':
        viewContacts();
        break;
        case '3':
        deleteContact();
        break;
    }
});

function addContacts()
{
    rl1.close();
    var rl2 = readline1.createInterface({input: process.stdin,output: process.stdout});
    rl2.question("Enter name:\n",(answer)=>
    {
        rl2.close();
        var rl3 = readline1.createInterface({input: process.stdin,output: process.stdout});
        {
            rl3.question("Enter Phone Number:\n",(answer2)=>
            {
                MongoClient.connect(url,function(err,db)
                {
                    if(err)throw err;
                    var myquery = { name : answer ,phone:answer2};
                    db.collection("contacts").insertOne(myquery, function(err, obj) 
                    {
                        if (err) throw err;
                        console.log("Contact saved");
                        db.close();
                    });
                });
                rl3.close();
            });
        }
    });
}

function viewContacts()
{
    MongoClient.connect(url, function(err, db) 
    {
        if (err) throw err;
        db.collection("contacts").find({}).toArray(function(err, result) 
        {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
    rl1.close();
}

function deleteContact()
{
    rl1.close();
    var rl2 = readline1.createInterface({input: process.stdin,output: process.stdout});
    rl2.question("Enter the name of the contact you want to delete:\n",(answer)=>
    {
        MongoClient.connect(url,function(err,db)
        {
            if(err)throw err;
            var myquery = { name : answer };
            db.collection("contacts").deleteOne(myquery, function(err, obj) 
            {
                if (err) throw err;
                console.log("1 contact deleted");
                db.close();
            });
        });
        rl2.close();
    });
}

