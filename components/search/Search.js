import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

const Search = (props) => {
    const [dataSource] = useState(['apple', 'banana', 'cow', 'dex', 'zee', 'orange', 'air', 'bottle'])
    const [filtered, setFiltered] = useState(dataSource)
    const [searching, setSearching] = useState(false)
    const onSearch = (text) => {
        if (text) {
            setSearching(true)
            const temp = text.toLowerCase()

            const tempList = dataSource.filter(item => {
                if (item.match(temp))
                    return item
            })
            setFiltered(tempList)
        }
        else {
            setSearching(false)
            setFiltered(dataSource)
        }

    }
    return (
        <View>
            <SearchBar round
                searchIcon={{ size: 24 }}
                placeholder="חיפוש"
                style={styles.textInput}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        // backgroundColor: '#e4e6eb',
        // borderRadius: 100,
        height: 40,
        paddingHorizontal: '32%',
        
        
        
    },
})
export default Search;
