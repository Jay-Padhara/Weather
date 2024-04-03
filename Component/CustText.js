import React from 'react';
import { View, Text } from 'react-native';

export default function CustText({ text, style, extra }) {
    return (
        <View>
            <View>
                <Text style={style}>{text}{extra}</Text>
            </View>
        </View>
    );
}