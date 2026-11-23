import {Router} from "express";
import Serie from "../../models/user.model.js";

const router = Router();

router.post("/", async(data)=>{
    const serie= await Serie.create(data);
});

router.get("/",async()=>{
    const series=await Serie.find();
    return series;
});

router.get("/:id",async(id)=>{
    const serie=await Serie.findById(id);
    return serie;
});

router.put("/:id",async(id,data)=>{
    const {serieTitle, serieGenre, serieSinopsis, serieYear, seasons}=data;
    const serie=await Serie.findById(id);
    if(serie){
        serie.serieTitle=serieTitle;
        serie.serieGenre=serieGenre;
        serie.serieSinopsis=serieSinopsis;
        serie.serieYear=serieYear;
        serie.seasons=seasons;
        await serie.save();
        return serie;
    }else{
        return null;
    }
})

router.patch("/:id", async(id,data)=>{
    const {serieTitle,serieGenre, serieSinopsis,serieYear,seasons}=data;
    const serie=await Serie.findById(id);

    if(!serie){
        return null;
    }
    serie.serieTitle=serieTitle || serie.serieTitle;
    serie.serieGenre=serieGenre || serie.serieGenre;
    serie.serieSinopsis=serieSinopsis || serie.serieSinopsis;
    serie.serieYear=serieYear || serie.serieYear;
    serie.seasons=seasons || serie.seasons;
    await serie.save();
    return serie;
});

router.delete("/:id", async(id)=>{
    const serie=await Serie.findByIdAndDelete(id);
});

export default router;
