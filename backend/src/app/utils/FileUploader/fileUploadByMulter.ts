import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd() + '/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
 export const upload = multer({ storage: storage })


 /****
  * Notes: when we will use upload.single('profileImage') in the router ,then we will get all the data from req.file
  *  
  * 
  * usersRouter.post('/create-student',auth(USER_ROLE.admin), upload.single('profileImage'), (req:Request, res:Response, next:NextFunction) => {
     req.body = JSON.parse(req.body.data);
      next();
  },
  * 
  * 
  * 
  */