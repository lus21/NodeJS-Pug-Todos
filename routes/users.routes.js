import { Router } from 'express';
import userModel from '../user.model';

const router = Router();


router.get('/', (req, res) => {
    userModel.find()
            .then((users) => res.render('users/index', { title: "Users Homepage", users: users }))
            .catch((e) => res.status(400).render('users/error', { title: "Error", msg: JSON.stringify(e) }));
});

router.post('/new', (req, res) => {
    const { name, age } = req.body;
    if(!name || !age){
        return res.status(422).render('users/error', { title: "Error", msg: "Insert Correct data" });
    }
    if([name, age].filter((item) => !!item).length !== 2){
        return res.status(400).render('users/error', { title: "Error", msg: "Insert Correct data" });
    }
    const newUser = new userModel({
        name,
        age
    });
    newUser.save()
        .then((user) => res.redirect('/users'))    
        .catch((e) => res.status(400).render('users/error', { title: "Error", msg: JSON.stringify(e) }));
});

router.get('/new', (req, res) => {
    res.render('users/new', {title: "Add New User"});
});

router.get('/update/:id', (req, res) => {
    const user = userModel.findOne({_id : req.params.id}) 
        .then((user) => res.render('users/update', { title: "Update User", user: user }))
        .catch((e) => res.status(400).render('users/error', { title: "Error", msg: JSON.stringify(e) })); 
});

router.post('/update/:id', (req, res) => {
    const { name, age } = req.body;
    if(!name || !age){
        return res.status(422).render('users/error', { title: "Error", msg: "Insert Correct data" });
    }
    if([name, age].filter((item) => !!item).length !== 2){
        return res.status(400).render('users/error', { title: "Error", msg: "Insert Correct data" });
    }
    const filterQuery = { _id: req.params.id };
    const newValues = { name: req.body.name, age: req.body.age };
    const user = userModel.updateOne(filterQuery, newValues)
        .then((user) => res.redirect('/users'))
        .catch((e) => res.status(400).render('users/error', { title: "Error", msg: JSON.stringify(e) }));
});

router.get('/delete/:id', (req, res) => {
    const user = userModel.findByIdAndRemove(req.params.id) //or deleteOne
        .then((user) => res.redirect('/users'))
        .catch((e) => res.status(400).render('users/error', { title: "Error", msg: JSON.stringify(e) }));
});


module.exports = router;