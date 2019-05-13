const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');

//get all members in schema
router.get('/', (req, res) => res.json(members)); 

//get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id ));

    if(found){ 
    res.json(members.filter(member => member.id === parseInt(req.params.id )));
    }
    else{

        res.status(400).json({msg : 'member not found'} );
    }
});

//creat member
router.post('/', (req, res) => {


    res.send(req.body);
    const newMember = {

            id: uuid.v4(),
            name: req.body.name,
            email: req.body.email,
            status: 'active'
        

    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg: 'please include a name or email'});
    }

    member.push(newMember);
    res.json(members)
});

//update members
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id ));

    if(found){ 

        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({msg: 'Member updated', member});
            }
        });

    }
    else{

        res.status(400).json({msg : 'member not found'} );
    }
});

//Delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id ));

    if(found){ 
    res.json({msg: 'Member deleted', 
    members: members.filter(member => member.id !== parseInt(req.params.id ))});
    }
    else{

        res.status(400).json({msg : 'member not found'} );
    }
});
module.exports = router;