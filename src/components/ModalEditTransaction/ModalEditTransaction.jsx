import React, {useState, useForm} from "react";
import styles from "../ModalEditTransaction/ModalEditTransaction.module.css"
import { GreenButton } from "../Greenbutton/GreenButton";
import { CancelButton } from "../CancelButton/CancelButton";
import { SelectMenuModal } from "../SelectMenuModal/SelectMenuModal";

 export const ModalEditTransaction = ({type, onClose, id, getConnect}) => {

    const [modal, setModal] = useState(false)
    const [data, setData] = useState()

    const dateTrim = (e) => {
        const selectedData = e.target.value.toString()
        const day = selectedData.substr(8,2)
        const month = selectedData.substr(5,2)
        const year = selectedData.substr(0,4)
        setData({ ...data, date:
            {day: day,
            month: month,
            year: year
        }, id:id
    })}

    const submitModal = () => {
        setModal(!modal)
        console.log('Dane do przesłania do bazy danych w celu edycji Transakcji')
        console.log(data)
        onClose()
        const dataId = data.id
        // console.log(dataId)
        fetch(`https://cosmic-answer-399520.lm.r.appspot.com/api/mockTransactions/${dataId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
            .then(res => res.json())
            .then(json => setData(json.data))
            getConnect()
    }
    // const sendCategory = (data) => {onChangeCategory(data)}

    return (
        <div className={styles.modalWrapper}>
            <section className={styles.wrapper}>
                <h2 className={styles.header}>Edit transaction</h2>
                <div className={styles.sliderContainer}>
                    {type==='+'?<span className={styles.greenText}>Income</span>:<span className={styles.greyText}>Income</span>}
                    <span className={styles.greyText}>/</span>
                    {type==='+'?<span className={styles.greyText}>Expense</span>:<span className={styles.redText}>Expense</span>}
                </div>
                <form onSubmit={submitModal} className={styles.Form}>
                    <section className={styles.modalForm}>
                        <label name="addTransForm">
                            {type==='+'?<></>:<SelectMenuModal onClick={e => setData({ ...data, category: e, id:id })} placeholder={'Select a category'}/>}
                            <div  className={styles.formWrapper}>
                                <input 
                                    type="number"
                                    name="sum" 
                                    onChange={e=>setData({...data, sum: e.target.value, id:id})}
                                    placeholder="0.00"
                                    className={styles.formValue}>
                                </input>
                                <input
                                    type="date"
                                    name="date"
                                    onChange={dateTrim}
                                    className={styles.formDate}>  
                                </input>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Comment"
                                name="comment"
                                onChange={e=>setData({...data, comment: e.target.value, id:id})}
                                className={styles.formComment}> 
                            </input>
                            <ul className={styles.modalList}>
                                <li><GreenButton name="SAVE"/></li>
                                <li><CancelButton name="CANCEL" onClick={onClose}/></li>
                                <li><button className={styles.closeButton} onClick={onClose}></button></li>
                            </ul>
                        </label>
                    </section>
                </form>
            </section>
            <div className={styles.shadow}  onClick={onClose}></div>
        </div>
    )} 
