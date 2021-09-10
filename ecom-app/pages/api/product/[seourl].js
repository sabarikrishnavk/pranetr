export default function handler(req, res) {
  const { seourl } = req.query
    res.status(200).json({
    "id": seourl,
    "name": " product name 1",
    "child": [
      {
        "size": "S",
        "color": "blue"
      },
      {
        "size": "S",
        "color": "red"
      }
    ],
    "category": "shirts"
  })
}