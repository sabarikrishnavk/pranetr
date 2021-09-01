export default async function preview(req, res) {
    // Check the secret and next parameters 
     
    // Enable Preview Mode by setting the cookies
    const path = req.query.path
    res.setPreviewData({}) 
    res.redirect("/"+path)
  }