/*import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Icons from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import TopNavBar2 from '../navigation/TopNavBar2';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker]= useState(false);

    const toggleDatePicker =() => {
        setShowPicker(!showPicker);
    };

const onChange=({type}, selectedDate) => {
    if(type =='set'){
        const currentDate = selectedDate;
        setDate(currentDate);
        if(Platform.OS=== "android"){
            toggleDatePicker();
            setBirthdate(currentDate.toDateString());
        }
    }else{
        toggleDatePicker();
    }
};

const confirmIOSDate =() =>{
    setBirthdate(currentDate.toDateString());
    toggleDatePicker();
}

    const handleSubmit = async ()=>{
        if(email && password){
            try{
                await createUserWithEmailAndPassword(auth, email, password);
            }catch(err){
                console.log('got error: ',err.message);
                let msg = err.message;
                if(msg.includes('auth/email-already-in-use')) msg = "Email already in use"
                if(msg.includes('auth/invalid-email)')) msg = "Please use a valid email"
                Alert.alert('Sign Up', err.message);
            }
        }
    }
     // validation 
  const handleSubmit = async () => {
    if (email && password && firstName && lastName && phoneNumber && birthdate && country && city) {
        if (phoneNumber.length === 10 && phoneNumber.startsWith('05')) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (err) {
                console.log('حدث خطأ: ', err.message);
                let msg = err.message;
                if (msg.includes('auth/email-already-in-use')) msg = "البريد الإلكتروني مستخدم بالفعل"
                if (msg.includes('auth/invalid-email)')) msg = "يرجى استخدام بريد إلكتروني صحيح"
                Alert.alert('تسجيل', err.message);
            }
        } else {
            Alert.alert('رقم هاتف غير صحيح', 'يجب أن يتكون رقم الهاتف من 10 أرقام ويبدأ بـ "05"');
        }
    } else {
        Alert.alert('حقول مفقودة', 'يرجى ملء جميع الحقول المطلوبة');
    }
}
  return (
    
    <View className="flex-1 " style={{backgroundColor: themeColors.bg}}>
    
      <TopNavBar2/>
      <ScrollView className="flex flex-1">
      <View className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
      >
        <View className="form space-y-2">
        <Text className="text-gray-700 ml-4">الاسم الأول</Text>
            <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={firstName}
            onChangeText={value => setFirstName(value)}
            placeholder='ادخل الاسم الأول'
            />
            <Text className="text-gray-700 ml-4">الاسم الأخير</Text>
<TextInput
    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
    value={lastName}
    onChangeText={value => setLastName(value)}
    placeholder='ادخل الاسم الأخير'
/>
            <Text className="text-gray-700 ml-4">اسم المستخدم</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={username}
                onChangeText={value=> setUsername(value)}
                placeholder='ادخل اسم المستخدم'
            />
            <Text className="text-gray-700 ml-4">البريد الالكتروني</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={email}
                onChangeText={value=> setEmail(value)}
                placeholder='ادخل بريدك الالكتروني'
            />
            <Text className="text-gray-700 ml-4">كلمة المرور</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                value={password}
                onChangeText={value=> setPassword(value)}
                placeholder='ادخل كلمة المرور'
            />
            <Text className="text-gray-700 ml-4">رقم الجوال</Text>
            <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={phoneNumber}
            onChangeText={value => setPhoneNumber(value)}
            placeholder='ادخل رقم الجوال'
            />
            <Text className="text-gray-700 ml-4">تاريخ الميلاد</Text>
            {showPicker && (
                <DateTimePicker
                mode ='date'
                display= 'spinner'
                value={date}
                onChange={onChange}
                maximumDate={new Date('2009-1-1')}
                minimumDate={new Date('1940-1-1')}
                // height smaller 
            />
            )}
            {showPicker && Platform.OS === "ios" && (
           <View //add style here and for الغاء https://www.youtube.com/watch?v=UEfFjfW7Zes extra features 7
           >
           <TouchableOpacity onPress={confirmIOSDate}>
           <Text>الغاء</Text>

           </TouchableOpacity>

           </View>
    
            ) }

        

            

           {!showPicker && (
            <Pressable onPress={toggleDatePicker}>
            <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={birthdate}
            onChangeText={value => setBirthdate(value)}
            placeholder='ادخل تاريخ الميلاد'
            editable={false}
            onPressIn={toggleDatePicker}
            />
            </Pressable>
           )}

            <Text className="text-gray-700 ml-4">الدولة</Text>
            <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={country}
               onChangeText={value => setCountry(value)}
                placeholder='ادخل اسم الدولة'
            />
                <Text className="text-gray-700 ml-4">المدينة</Text>
            <TextInput
           className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
           value={city}
           onChangeText={value => setCity(value)}
           placeholder='ادخل اسم المدينة'
            />
            <TouchableOpacity
                className="py-3 rounded-xl"
                onPress={handleSubmit}
                style={{ backgroundColor: themeColors.lightb }}
            >
                <Text className="text-xl font-bold text-center text-gray-700">
                    انشاء حساب
                </Text>
            </TouchableOpacity>
        </View>
        
        <View className="flex-row justify-center mt-7">
        <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                <Text className="font-semibold text-[#82C8FF] underline">تسجيل الدخول</Text>
            </TouchableOpacity>
            <Text className="text-gray-500 font-semibold">لديك حساب؟</Text>
        </View>
      </View></ScrollView>
    </View>
  )
}*/
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView, Platform, StyleSheet } from 'react-native';
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import TopNavBar2 from '../navigation/TopNavBar2';

export default function SignUpScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChange = ({ type }, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS === "android") {
                toggleDatePicker();
                setBirthdate(currentDate.toDateString());
            }
        } else {
            toggleDatePicker();
        }
    };

    const confirmIOSDate = () => {
        setBirthdate(date.toDateString());
        toggleDatePicker();
    }
   // validation 
 /* const handleSubmit = async () => {
    if (email && password && firstName && lastName && phoneNumber && birthdate && country && city) {
        if (phoneNumber.length === 10 && phoneNumber.startsWith('05')) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (err) {
                console.log('حدث خطأ: ', err.message);
                let msg = err.message;
                if (msg.includes('auth/email-already-in-use')) msg = "البريد الإلكتروني مستخدم بالفعل"
                if (msg.includes('auth/invalid-email)')) msg = "يرجى استخدام بريد إلكتروني صحيح"
                Alert.alert('تسجيل', err.message);
            }
        } else {
            Alert.alert('رقم هاتف غير صحيح', 'يجب أن يتكون رقم الهاتف من 10 أرقام ويبدأ بـ "05"');
        }
    } else {
        Alert.alert('حقول مفقودة', 'يرجى ملء جميع الحقول المطلوبة');
    }
}*/
    const handleSubmit = async () => {
        if (email && password) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (err) {
                console.log('got error: ', err.message);
                let msg = err.message;
                if (msg.includes('auth/email-already-in-use')) msg = "Email already in use"
                if (msg.includes('auth/invalid-email)')) msg = "Please use a valid email"
                Alert.alert('Sign Up', err.message);
            }
        }
    }

    return (
        <View style={styles.container}>
            <TopNavBar2 />
            <ScrollView style={styles.scrollView}>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>الاسم الأول</Text>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={value => setFirstName(value)}
                        placeholder='ادخل الاسم الأول'
                    />
                    <Text style={styles.label}>الاسم الأخير</Text>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={value => setLastName(value)}
                        placeholder='ادخل الاسم الأخير'
                    />
                    <Text style={styles.label}>اسم المستخدم</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={value => setUsername(value)}
                        placeholder='ادخل اسم المستخدم'
                    />
                    <Text style={styles.label}>البريد الالكتروني</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={value => setEmail(value)}
                        placeholder='ادخل بريدك الالكتروني'
                    />
                    <Text style={styles.label}>كلمة المرور</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={value => setPassword(value)}
                        placeholder='ادخل كلمة المرور'
                    />
                    <Text style={styles.label}>رقم الجوال</Text>
                    <TextInput
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={value => setPhoneNumber(value)}
                        placeholder='ادخل رقم الجوال'
                    />
                    <Text style={styles.label}>تاريخ الميلاد</Text>
                    {showPicker && (
                        <DateTimePicker
                            mode='date'
                            display='spinner'
                            value={date}
                            onChange={onChange}
                            maximumDate={new Date('2009-1-1')}
                            minimumDate={new Date('1940-1-1')}
                        />
                    )}
                    {showPicker && Platform.OS === "ios" && (
                        <View style={styles.iosCancelButton}>
                            <TouchableOpacity onPress={confirmIOSDate}>
                                <Text>الغاء</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {!showPicker && (
                        <TouchableOpacity onPress={toggleDatePicker}>
                            <TextInput
                                style={styles.input}
                                value={birthdate}
                                placeholder='ادخل تاريخ الميلاد'
                                editable={false}
                            />
                        </TouchableOpacity>
                    )}

                    <Text style={styles.label}>الدولة</Text>
                    <TextInput
                        style={styles.input}
                        value={country}
                        onChangeText={value => setCountry(value)}
                        placeholder='ادخل اسم الدولة'
                    />
                    <Text style={styles.label}>المدينة</Text>
                    <TextInput
                        style={styles.input}
                        value={city}
                        onChangeText={value => setCity(value)}
                        placeholder='ادخل اسم المدينة'
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>انشاء حساب</Text>
                    </TouchableOpacity>
                    <View style={styles.signInContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.signInText}>تسجيل الدخول</Text>
                    </TouchableOpacity>
                    <Text style={styles.orText}>لديك حساب؟</Text>
                </View>
                </View>
                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.bg,
    },
    scrollView: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    label: {
        color: '#555',
        marginLeft: 20,
    },
    input: {
        padding: 15,
        backgroundColor: '#f2f2f2',
        color: '#555',
        borderRadius: 20,
        marginBottom: 10,
    },
    button: {
        padding: 15,
        backgroundColor: themeColors.lightb,
        borderRadius: 20,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#555',
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signInText: {
        fontWeight: 'bold',
        color: '#82C8FF',
        textDecorationLine: 'underline',
    },
    orText: {
        color: '#888',
        fontWeight: 'bold',
    },
    iosCancelButton: {
        // iOS cancel button style here
    },
});
