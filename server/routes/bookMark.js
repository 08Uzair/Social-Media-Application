import expresss from "express"
import { addMark, deleteMark, getMark, getMarkById } from "../controllers/bookmark.js"

export const markRouter = expresss.Router()

markRouter.post("/",addMark)
markRouter.get("/",getMark)
markRouter.get("/:id",getMarkById)
markRouter.delete("/:id",deleteMark)
