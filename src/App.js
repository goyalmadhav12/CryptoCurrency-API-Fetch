import axios from 'axios';
import React ,{useState,useEffect} from 'react'
import './index.css';
export default function App() {
    const [name, setName] = useState('');
    const [arr,setarr]=useState([]);
    const [k,setk]=useState(0);
    const [clicked,setClicked]=useState(0);
    const [isclk,setisclk]=useState(0);
    //To render components
    const [fetchedName,setFetchedName]=useState('');
    const [fetchedSymbol,setFetchedSymbol]=useState('');
    const [rank,setRank]=useState('');
    const [isnew,setIsNew]=useState(false);
    const [active,setActive]=useState(false);
    const [type,setType]=useState('');
    const [desc,setdesc]=useState('');
    const [opensource,setOpensource]=useState('');
    const [developmentStatus,setDevelopmentStatus]=useState('');
    const [hardwarewallet,setHardwareWallet]=useState('');
    const [orgStructure,setOrgStructure]=useState('');
    const [loading,setLoading]=useState(false);
    const [prediction,setPrediction]=useState([]);
    const [show,setShow]=useState('hidden');
    let prar=[];
   useEffect(() => {
        async function getData(){
            const res=await axios.get('https://api.coinpaprika.com/v1/coins/');
            setarr(res.data);
        }
        getData();
    }, [])
    const handler=(event)=>{
        prar=[];
        setShow('scroll');
        arr.map((element)=>{
        if(element.name.toLowerCase().startsWith(event.target.value.toLowerCase()) && event.target.value.length)
        {
            // setPrediction([...prediction,element.name]);
            prar.push(element.name);       
        }
        });
        setPrediction(prar);
        setName(event.target.value);
    }
    const handlesuggest=(val)=>{
        setName(val);
        console.log(name);
    }
    const butHandler=()=>{
        setShow('hidden');
        setisclk(1);
        setk(Math.random());
    }
    useEffect(() => {
        const fun=()=>{
            for(let i=0;i<arr.length;i++)
            {
                if(arr[i].name.toLowerCase()===name.toLowerCase() )
                {
                    return arr[i].id;
                }
            }
            return 0;
         }
         let check=fun();
         if(check!==0)
         {
            axios.get(`https://api.coinpaprika.com/v1/coins/${check}`)
            .then((res)=>{
            setClicked(1);
            setLoading(false);
            setFetchedName(res.data.name);
            setFetchedSymbol(res.data.symbol);
            setRank(res.data.rank);
            setIsNew(res.data.is_new);
            setActive(res.data.is_active);
            setType(res.data.type);
            setdesc(res.data.description);
            setOpensource(res.data.open_source);
            setDevelopmentStatus(res.data.development_status)
            setHardwareWallet(res.data.hardware_wallet);
            setOrgStructure(res.data.org_structure);
            setName('');
            setPrediction([]);
            });
            setLoading(true);
         }
         else{
            setClicked(0);
         }

    }, [k])
    if(clicked)
    {
        return (
            <div className='main'>
                <input type='text' placeholder='Enter currency name' onChange={handler} value={name} className='inpt'/>
                <p style={{display:'block',overflow:show }}>{prediction.map((par)=><li style={{listStyleType:'none',color:'blueviolet',cursor:'pointer'}} onClick={()=>handlesuggest(par)}>{par}</li>)}</p>
                <button onClick={butHandler} className='btn'>Click me</button>
                <p style={{color:'blueviolet',margin:0,padding:0}}>{(loading)?'Loading.....':''}</p>
                <div className='idv'>  
                    <div style={{width:'50%',marginLeft:40}}>
                        <p className='txt'>Name: {fetchedName}</p>
                        <p className='txt'>Symbol: {fetchedSymbol}</p>
                        <p className='txt'>Rank: {rank}</p>
                        <p className='txt'>Version: {(isnew)?'New':'Old'}</p>
                        <p className='txt'>Active: {(active)?'Yes':'No'}</p>
                        <p className='txt'>Type: {type}</p>
                    </div>
                    <div style={{width:'50%'}}>
                        <p className='txt'>Open Source: {(opensource)?'Yes':'No'}</p>
                        <p className='txt'>Development Status: {developmentStatus}</p>
                        <p className='txt'>Hardware Wallet: {(hardwarewallet)?'Provided':'Not Available'}</p>
                        <p className='txt'>Organisation Structure: {orgStructure}</p>
                    </div>
                </div>
                <p className='txt' style={{marginLeft:40,marginBottom:50}}>Description: {desc}</p>
            </div>
        )
    }
    return (
        <div className='main'>
            <input type='text' placeholder='Enter currency name' onChange={handler} value={name} className='inpt'/>
            <p style={{display:'block', overflow:show }}>{prediction.map((par)=><li style={{listStyleType:'none',color:'blueviolet',cursor:'pointer'}} onClick={()=>handlesuggest(par)} >{par}</li>)}</p>
            <button onClick={butHandler} className='btn'>Click me</button>
            <p style={{color:'blueviolet',margin:0,padding:0}}>{(loading)?'Loading.....':''}</p>
            <p style={{color:'blueviolet'}}>{(isclk&& !clicked )?'Try Search by Entering Correct Name':''}</p>
        </div>
    )
}

