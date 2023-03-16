const supabase = require('../supabaseClient.js')


async function register(req, res) {
    
    const { name, email, password } = req

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })

    console.log(data)

    const user = {
        user_id: data.user.id,
        name: name,
        is_admin: false,
        email: email
    }

    const { data1, error1 } = await supabase
        .from('Profiles')
        .insert(user)

    console.log(data1)

    res.status(201)
    res.json(data)
}

async function login(req, res) {
    
}

module.exports = {
    register
}