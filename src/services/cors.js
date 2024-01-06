const ACCEPTED_ORIGINS = [
	'http://localhost:5173',
	'https://mistorneos.com'
]

export const cors = (req, res, next)=>{
	const origin = req.header('origin')//origin que manda la peticion
	//si es del mismo origen la api y el fetch no devuelve el origin
    console.log(origin)
	if(ACCEPTED_ORIGINS.includes(origin) || !origin){
		res.header('Access-Control-Allow-Origin',origin);
        console.log('lo deje pasar')
	}
	next();
}

export const corsOptions = (req, res)=>{
	const origin = req.header('origin')//origin que manda la peticion
	//si es del mismo origen la api y el fetch no devuelve el origin
	if(ACCEPTED_ORIGINS.includes(origin) || !origin){
		res.header('Access-Control-Allow-Origin',origin);
		res.header('Access-Control-Allow-Methods','POST, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers','Content-Type');
	}
	res.sendStatus(200)
}