import React, { useState } from "react";
import { backend } from "../../consts";
import { Button } from "../Button";


export const PanelRoute:React.FC<{value:any, index:number, index2: number, onChange:(oid:string)=>void}> = (props) =>{
    const [nearest, setNearest] = useState([])
    return <div>
                    <img style={{width:'200px'}} src='/icons/not_found.jpeg'></img> 
                    <p>{props.value.point.description}</p>
                    <div className="nearesrtWrapper">
                        {
                            nearest.length == 0? null: nearest.map((value:any)=>{
                                return <div key={value.oid}>
                                            <div className="hotelCard" >
                                                <img className="hotelImg" src='/icons/not_found.jpeg'></img>
                                                <h5>{value.title}</h5>
                                                <div className="hotelCardRow">
                                                    <div>{value.description.length > 50? value.description.slice(0,70)+'...': value.description}</div>
                                                </div>
                                                <Button className="btn-y" onClick={() => props.onChange(value.oid)}>Выбрать</Button>
                                            </div>
                                        </div>
                            })
                        }
                    </div>
                    <Button onClick={()=>backend.get('/recommendations/' + props.value.point.oid + '/get_nearest_user_distance/').then((e)=>setNearest(e.data))} className="">Изменить точку маршрута</Button>
            </div>
}