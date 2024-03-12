import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import css from './Searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
    // ================== STATE
    const [term, setTerm] = useState('');
    // ================== /STATE

    // ================== LOGIC
    const handleTermChange = evt => setTerm(evt.target.value.toLowerCase());

    const handleSubmit = evt => {
        evt.preventDefault();

        if (term.trim() === '') {
            Notify.warning('Empty string');
            return;
        }
        onSubmit(term);
        setTerm('');
    };
    // ================== /LOGIC

    return (
        <header className={css.searchbar}>
            <form onSubmit={handleSubmit} className={css.form}>
                <button type="submit" className={css.button}>
                    <span className={css['button-label']}>
                        <IoSearchOutline size={'2em'} />
                    </span>
                </button>
                <input
                    onChange={handleTermChange}
                    value={term}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    className={css.input}
                />
            </form>
        </header>
    );
};

export default Searchbar;
