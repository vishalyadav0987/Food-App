import React from 'react'
import { menu_list } from '../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <>
            <section id="ExploreMenu">
                <div className="ExploreMenu-content">
                    <h1 className='top-heading'>Explore Menu</h1>
                    <p className='explore-menu-text'>Lorem ipsum dolor sit, amet consectetur            adipisicing            elit. Eveniet similique, delectus optio est ab minima?
                    </p>
                    <div className="menu-list">
                        {
                            menu_list.map((item, index) => {
                                return (
                                    <div key={index} className='explore-menu-list-item'
                                        onClick={
                                            () =>
                                                setCategory(prev => prev === item.menu_name ?
                                                    "All" :
                                                    item.menu_name)
                                        }>
                                        <img
                                            src={item.menu_image}
                                            alt=""
                                            className={category === item.menu_name ? "active" : ""}
                                        />
                                        <p className='explore-menu-list-item-text'>{item.menu_name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default ExploreMenu
