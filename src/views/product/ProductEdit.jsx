import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './ProductEdit.css'

export default function ProductEditPage() {

    const [menus, setMenus] = useState([]);
    const [toppings, setToppings] = useState([]);

    const [menuName, setMenuName] = useState('')
    const [menuDescription, setMenuDescription] = useState('')
    const [menuPrice, setMenuPrice] = useState('')
    const [menuCategory, setMenuCategory] = useState('')
    const [menuImage, setMenuImage] = useState('')
    const [menuNameUpdate, setMenuNameUpdate] = useState('')
    const [menuDescriptionUpdate, setMenuDescriptionUpdate] = useState('')
    const [menuPriceUpdate, setMenuPriceUpdate] = useState('')
    const [menuCategoryUpdate, setMenuCategoryUpdate] = useState('')
    const [menuImageUpdate, setMenuImageUpdate] = useState('')
    
    const [toppingName, setToppingName] = useState('');
    const [toppingPrice, setToppingPrice] = useState('');
    const [toppingNameUpdate, setToppingNameUpdate] = useState('');
    const [toppingPriceUpdate, setToppingPriceUpdate] = useState('');

    const token = localStorage.getItem('token');

    const fetchProduct = async () => {
        const response = await axios.get(
            'https://bubble-tea-cafe-api-production.up.railway.app/api/menu'
        );
        const menus_data = response.data;
        setMenus(menus_data.data);
    };

    const fetchToppings = async () => {
        const response = await axios.get(
            'https://bubble-tea-cafe-api-production.up.railway.app/api/topping', {
                headers: {
                    Authorization: token
                }
            }
        );
        const toppings_data = response.data;
        setToppings(toppings_data.data);
    };
    
    const menuSubmit = async (e) => {
        e.preventDefault();
        
        var menuPriceNumber = Number(menuPrice)
        
        await axios({
            method: 'post',
            url: 'https://bubble-tea-cafe-api-production.up.railway.app/api/menu',
            data: {
                name: menuName,
                description: menuDescription,
                price: menuPriceNumber,
                category: menuCategory,
                image: menuImage},
                headers: {Authorization: token}
            })
            handleReset();
            window.location.reload();
        }
        
    const toppingSubmit = async (e) => {
        e.preventDefault();
            
        var toppingPriceNumber = Number(toppingPrice)
            
        await axios({
            method: 'post',
            url: 'https://bubble-tea-cafe-api-production.up.railway.app/api/topping',
            data: {
                name: toppingName,
                price: toppingPriceNumber},
            headers: {Authorization: token}
        })
        handleReset();
        window.location.reload();
    }

    const menuUpdate = async (e) => {
        e.preventDefault();

        var menuPriceNumber = Number(menuPriceUpdate)
        let menuNameOption = document.querySelector('#menuSelectUpdate').value;
        var menuId

        menus.map((menu) => {
            if (menu.name == menuNameOption) {
                menuId = menu.Id
            }
        })

        await axios({
            method: 'put',
            url: 'https://bubble-tea-cafe-api-production.up.railway.app/api/menu/' + menuId,
            data: {
                name: menuNameUpdate,
                description: menuDescriptionUpdate,
                price: menuPriceNumber,
                category: menuCategoryUpdate,
                image: menuImageUpdate},
                headers: {Authorization: token},
            });

        window.location.reload();
    }

    const toppingUpdate = async (e) => {
        e.preventDefault();

        var toppingPriceNumber = Number(toppingPriceUpdate)
        let toppingNameOption = document.querySelector('#toppingUpdateSelect').value;
        var toppingId

        toppings.map((topping) => {
            if (topping.name == toppingNameOption) {
                toppingId = topping.Id
            }
        })

        await axios({
            method: 'put',
            url: 'https://bubble-tea-cafe-api-production.up.railway.app/api/topping/' + toppingId,
            data: {
                name: toppingNameUpdate,
                price: toppingPriceNumber},
                headers: {Authorization: token},
            });

        window.location.reload();
    }

    const menuDelete = async (e) => {
        e.preventDefault();

        let menuSelect = document.querySelector('#menuSelect').value;
        var menuId

        menus.map((menu) => {
            if (menu.name == menuSelect) {
                menuId = menu.Id
            }
        })
        await axios.delete('https://bubble-tea-cafe-api-production.up.railway.app/api/menu/' + menuId, {
            headers: {
                Authorization: token
            }
        })
        window.location.reload();
    }

    const toppingDelete = async (e) => {
        e.preventDefault();

        let toppingSelect = document.querySelector('#toppingSelect').value;
        var toppingId

        toppings.map((topping) => {
            if (topping.name == toppingSelect) {
                toppingId = topping.Id
            } 
        })
        await axios.delete('https://bubble-tea-cafe-api-production.up.railway.app/api/topping/' + toppingId, {
            headers: {
                Authorization: token
            }
        })
        window.location.reload();
    }
    
    const handleReset = () => {
        setMenuName('');
        setMenuDescription('');
        setMenuPrice('');
        setMenuCategory('');
        setMenuImage('');
        setToppingName('');
        setToppingPrice('');
        setToppingNameUpdate('');
        setToppingPriceUpdate('');
    }
    
    useEffect(() => {
        fetchProduct();
        fetchToppings();
        }, []);
    
    return (
        <section className='producteditPage'>
            <div className='menuForms'>
                <h1 className='topHeader'>Menu</h1>
                <fieldset>
                    <h1>Create Menu</h1>
                    <form action='#' method='get'>
                        <label for='menuName'>Enter Name:</label>
                        <input type='text' name='menuName' id='menuName' value={menuName} onChange={(e) => setMenuName(e.target.value)} required/>
                        <label for='menuDescription'>Enter Description:</label>
                        <input type='text' name='menuDescription' id='menuDescription' value={menuDescription} onChange={(e) => setMenuDescription(e.target.value)} required/>
                        <label for='menuPrice'>Enter Price:</label>
                        <input type='text' name='menuPrice' id='menuPrice' value={menuPrice} onChange={(e) => setMenuPrice(e.target.value)} required/>
                        <label for='menuCategory'>Enter Category:</label>
                        <input type='text' name='menuCategory' id='menuCategory' value={menuCategory} onChange={(e) => setMenuCategory(e.target.value)} required/>
                        <label for='menuImage'>Enter Image Link:</label>
                        <input type='text' name='menuImage' id='menuImage' value={menuImage} onChange={(e) => setMenuImage(e.target.value)} required/>
                        <button type='submit' value='Submit' onClick={(e) => menuSubmit(e)}>
                            Create
                        </button>
                    </form>
                </fieldset>
                <fieldset>
                    <h1>Update Menu</h1>
                    <form action='#' method='get'>
                        <label for='menuUpdate'>Choose a Menu to Update:</label>
                        <select id='menuSelectUpdate' name='menuSelectUpdate' onChange={(e) => setMenuNameUpdate(e.target.value)}>
                            {menus.map((menu) => (
                                <option value={menu.name}>{menu.name}</option>
                            ))}
                        </select>
                        <label for=''>Enter New Name:</label>
                        <input type='text' name='menuNameUpdate' id='menuNameUpdate' value={menuNameUpdate} onChange={(e) => setMenuNameUpdate(e.target.value)} required/>
                        <label for=''>Enter New Description:</label>
                        <input type='text' name='menuDescriptionUpdate' id='menuDescriptionUpdate' value={menuDescriptionUpdate} onChange={(e) => setMenuDescriptionUpdate(e.target.value)} required/>
                        <label for=''>Enter New Price:</label>
                        <input type='text' name='menuPriceUpdate' id='menuPriceUpdate' value={menuPriceUpdate} onChange={(e) => setMenuPriceUpdate(e.target.value)} required/>
                        <label for='menuCategory'>Enter New Category:</label>
                        <input type='text' name='menuCategoryUpdate' id='menuCategoryUpdate' value={menuCategoryUpdate} onChange={(e) => setMenuCategoryUpdate(e.target.value)} required/>
                        <label for=''>Enter New Image Link:</label>
                        <input type='text' name='menuImageUpdate' id='menuImageUpdate' value={menuImageUpdate} onChange={(e) => setMenuImageUpdate(e.target.value)} required/>
                        <button type='submit' value='Submit' onClick={(e) => menuUpdate(e)}>
                            Update
                        </button>
                    </form>
                </fieldset>
                <fieldset>
                    <h1>Delete Menu</h1>
                    <form action='#' method='get'>
                        <label for='menuDelete'>Choose a Menu to Delete:</label>
                        <select id='menuSelect' name='menuSelect'>
                            {menus.map((menu) => (
                                <option value={menu.name}>{menu.name}</option>
                            ))}
                        </select>
                        <button type='submit' value='Submit' onClick={(e) => menuDelete(e)}>
                            Delete
                        </button>
                    </form>
                </fieldset>
            </div>
            <div className='toppingForms'>
                <h1 className='topHeader'>Topping</h1>
                <fieldset>
                    <h1>Create Topping</h1>
                    <form action='#' method='get'>
                        <label for='toppingName'>Enter Name:</label>
                        <input type='text' name='toppingName' id='toppingName' value={toppingName} onChange={(e) => setToppingName(e.target.value)} required/>
                        <label for='toppingPrice'>Enter Price:</label>
                        <input type='text' name='toppingPrice' id='toppingPrice' value={toppingPrice} onChange={(e) => setToppingPrice(e.target.value)} required/>
                        <button type='submit' value='Submit' onClick={(e) => toppingSubmit(e)}>
                            Create
                        </button>
                    </form>
                </fieldset>
                <fieldset>
                    <h1>Update Topping</h1>
                    <form action='#' method='get'>
                        <label for='toppingUpdate'>Choose a Topping to Update:</label>
                        <select id='toppingUpdateSelect' name='toppingUpdateSelect' onChange={(e) => setToppingNameUpdate(e.target.value)}>
                            {toppings.map((topping) => (
                                <option value={topping.name}>{topping.name}</option>
                            ))}
                        </select>
                        <label for='toppingNameUpdate'>Enter New Name:</label>
                        <input type='text' name='toppingNameUpdate' id='toppingNameUpdate' value={toppingNameUpdate} onChange={(e) => setToppingNameUpdate(e.target.value)} required />
                        <label for='toppingPriceUpdate'>Enter New Price:</label>
                        <input type='text' name='toppingPriceUpdate' id='toppingPriceUpdate' value={toppingPriceUpdate} onChange={(e) => setToppingPriceUpdate(e.target.value)} required />
                        <button type='submit' value='Submit' onClick={(e) => toppingUpdate(e)}>
                            Update
                        </button>
                    </form>
                </fieldset>
                <fieldset>
                    <h1>Delete Topping</h1>
                    <form action='#' method='get'>
                        <label for='toppingDelete'>Choose a Topping to Delete:</label>
                        <select id='toppingSelect' name='toppingSelect'>
                            {toppings.map((topping) => (
                                <option value={topping.name}>{topping.name}</option>
                            ))}
                        </select>
                        <button type='submit' value='Submit' onClick={(e) => toppingDelete(e)}>
                            Delete
                        </button>
                    </form>
                </fieldset>
            </div>
        </section>
    )
}