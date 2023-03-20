const supabase = require('../supabaseClient.js')


async function register(req, res) {
    const { name, email, password } = req.body //we had = req earlier...
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })
    console.log(data, error)
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

// async function login(req, res) {
// }

async function updateAvatar(req, res) {
    const { file, profile_id } = req.body
    const response = await supabase.from('profile').update({ url }).select("*").eq('user_id', String(profile_id))
    
}

async function getAvatarURL(req, res) {
    // const { data } = supabase
    // .storage
    // .from('assets')
    // .getPublicUrl('tameimpala.jpeg')
    // res.status(201).json(data)
}


module.exports = {
    register,
    updateAvatar,
    getAvatarURL
}