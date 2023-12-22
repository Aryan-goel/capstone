import React from 'react'
import Header from './Header';
import axios from 'axios';
import { FcAlphabeticalSortingAz, FcNumericalSorting12, FcGenericSortingAsc } from 'react-icons/fc'

import { useEffect, useState } from 'react';
import Select from 'react-select';
import Sidebar from './Sidebar';


const OrderStatus = () => {
    const entry =
        [
            {
                bucketname: "documents",
                purpose: "inventory",
                geography: "USA",
                service: "amazon",
                report_name: "aging",
                last_updated: "Never"
            },
            {
                bucketname: "document",
                purpose: "inventory",
                geography: "India",
                service: "amazon",
                report_name: "fbm inventory",
                last_updated: "Never"
            },
            {
                bucketname: "document",
                purpose: "inventory",
                geography: "Africa",
                service: "amazon",
                report_name: "ledger",
                last_updated: "Never"
            },
            {
                bucketname: "document",
                purpose: "inventory",
                geography: "London",
                service: "amazon",
                report_name: "manage fba",
                last_updated: "Never"
            },
            {
                bucketname: "document",
                purpose: "inventory",
                geography: "Singapore",
                service: "amazon",
                report_name: "removal orders",
                last_updated: "Never"
            },
            {
                bucketname: "document",
                purpose: "inventory",
                geography: "Singapore",
                service: "amazon",
                report_name: "transfer order",
                last_updated: "Never"
            }, {
                bucketname: "document",
                purpose: "inventory",
                geography: "Singapore",
                service: "amazon",
                report_name: "purchasing orders",
                last_updated: "Never"
            },
            {
                bucketname: "document",
                purpose: "inventory",
                geography: "Singapore",
                service: "amazon",
                report_name: "receving orders",
                last_updated: "Never"
            },
            {
                bucketname: "document",
                purpose: "inventory",
                geography: "Singapore",
                service: "amazon",
                report_name: "bulk orders",
                last_updated: "Never"
            },
            {
                bucketname: "document",
                purpose: "inventory",
                geography: "Singapore",
                service: "amazon",
                report_name: "inventory orders",
                last_updated: "Never"
            }
        ]
    const [entries, setEntries] = useState(entry);
    const itemsPerPage = 5; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState(''); // State to track selected filter
    const [selectedOptions, setSelectedOptions] = useState();
    const filterOptions = [
        { label: 'All', value: '' },
        { label: 'USA', value: 'USA' },
        { label: 'India', value: 'India' },
        { label: 'Africa', value: 'Africa' },
        // Add more options here...
    ];

    const handleFilterChange = (event) => {
        console.log(event);
        const filterValue = event.value;
        setSelectedFilter(filterValue);
        console.log('selectedfilter', selectedFilter)
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setCurrentPage(1); // Reset to the first page when searching
    };

    function handleSelect(data) {
        setSelectedOptions(data);
    }


    useEffect(() => {
        axios.get('/api/entries/')
            .then(response => {
                setEntries(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        console.log("entries", entries)
        const filteredEntries = entry.filter(entries => {
            const searchTerms = searchQuery.toLowerCase().split(' ');
            return searchTerms.every(term =>
                entries.report_name.toLowerCase().includes(term) ||
                entries.geography.toLowerCase().includes(term) ||
                entries.last_updated.toLowerCase().includes(term) ||
                entries.bucketname.toLowerCase().includes(term) ||
                entries.purpose.toLowerCase().includes(term) ||
                entries.service.toLowerCase().includes(term)
            );
        });
        console.log('filtered entries', filteredEntries)
        if (selectedFilter) {
            setEntries(filteredEntries.filter(entries => entries.geography.toLowerCase() === selectedFilter.toLowerCase()));
        } else {
            setEntries(filteredEntries);
        }


    }, [searchQuery, selectedFilter]);

    const totalItems = entries.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = entries.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) {
            return;
        }

        setCurrentPage(page);
    };

    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }


        setSortConfig({ key, direction });
        const sortedData = [...entries].sort((a, b) => {

            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
        setEntries(sortedData);
        setCurrentPage(1);
    };


    return (
        <>


            <input
                className='search-bar'
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
            />

            <Select
                options={filterOptions}
                placeholder='Select Filter'
                value={selectedOptions}
                onChange={handleFilterChange}
                isSearchable={true}
                // isMulti
                className='filter-dropdown'

            />
            <div style={{ padding: '2rem' }} ></div>
            <div className='shadow'>
                <table style={{ width: '100%', height: '500px', background: '#fafbfb', paddingTop: '1rem', paddingBottom: '1rem', borderRadius: '0.5rem' }}>

                    <thead>
                        <tr className='table-headers'>
                            <th onClick={() => requestSort('report_name')}>Report Name <FcAlphabeticalSortingAz /> </th>
                            <th onClick={() => requestSort('geography')}>Geography<FcNumericalSorting12 /></th>
                            <th onClick={() => requestSort('last_updated')}>Last Updated <FcNumericalSorting12 /></th>
                            <th onClick={() => requestSort('bucketname')}>Bucket Name <FcGenericSortingAsc /></th>
                            <th onClick={() => requestSort('purpose')}>Purpose <FcGenericSortingAsc /></th>
                            <th onClick={() => requestSort('service')}>Service <FcNumericalSorting12 /> </th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentData.map((entry) => (
                            <tr className='table-entry' key={entries.report_name}>
                                <td>{entry.report_name}</td>
                                <td>{entry.geography}</td>
                                <td>{entry.last_updated}</td>
                                <td>{entry.bucketname}</td>
                                <td>{entry.purpose}</td>
                                <td>{entry.service}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
            <div className='paginate-div'>
                <button className='button-paginate' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button className='button-paginate' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </>

    )
}

export default OrderStatus