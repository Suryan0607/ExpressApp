const express = require ('express');
const router =  express.Router();
// const quotes= require('../data')
const Quotes = require ('../models/quotemodels');

// to get all quotes
router.get('/quotes/all',async(req,res)=>{
    // try {
    //  await res.status(200).send({
    //      quotes:quotes
    //  });
     
    // } catch (error) {
    //  console.log(`Error :${error}`)
    // }
    
try {
    Quotes.find((err,quotes)=>{
        if(err){
            return res.status(400).send({
                code:400,
                error:'error while getting data'
            })
        }
        return res.status(200).send({
                Quotes:quotes
            })
       
    })
    
} catch (error) {
    res.status(500).send({
        Error:error
    })
}



 });

 //to add a new quote
 router.post('/quotes/post',async (req,res) => {
    // try {
    //       const newOne=req.body;
    //       quotes.push(newOne);
    //       console.log(quotes);
    //       await res.status(201).send({
    //        message:"Added successfully"
    //    })
    //   } catch (error) {
    //       console.log(`Error :${error}`)  
    //   }
try {
    let quote = new Quotes (req.body);
    console.log(quote)
    quote.save((err,data)=>{
        if (err) {
            return res.status(400).send({
                code:400,
                error:'error while getting data'
            }) 
        }  
        return res.status(201).send({
                    quote:data
                }) 
            
        })
    }
    catch (error) {
    res.status(500).send({
        Error:error
    })
}

  });

  //to edit existing quote
  router.put('/quotes/put/:id',async(req,res)=>{
    // try {
    //  const editedQuote=req.body;
    //  const index=quotes.findIndex(q=>q.id==parseInt(req.params.id));
    //  quotes[index]=editedQuote;
    //  console.log(quotes)
    //  await res.status(201).send({
    //      message:"Quote Updated"
    //  })
    // } catch (error) {
    //  console.log(`Error :${error}`)  
    // }
    try {
        Quotes.findOneAndUpdate({_id:req.params.id},{$set: req.body},{new:true},
            (err,quote)=>{
                if (err) {
                    return res.status(400).send({
                        error:'Error while updating quote'
                    })    
                }
                return res.status(201).send(quote)
            })
        
    } catch (error) {
        res.status(500).send({
            Error:error
        })     
    }
 });

 //to delete a quate
router.delete('/quote/delete/:id',async(req,res)=>{
  
    // try {
    //  const deleteQuotes=quotes.filter(q=>q.id!==parseInt(req.params.id))
    //  console.log(deleteQuotes)
    //  await res.send({
    //      message:"Successfully Deleted"
    //  })
     
    // } catch (error) {
    //  console.log(`Error :${error}`)
    // }
    try {
        Quotes.deleteOne({_id:req.params.id},
            (err,quote)=>{
                if (err) {
                    return res.status(400).send({
                        error:'Error while deleting quote'
                    });    
                }
                return res.status(201).send("quote deleted successfully");
            })
        
    } catch (error) {
        res.status(500).send({
            Error:error
        })     
    }
 })

 module.exports = router;