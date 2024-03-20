import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView, Platform, StyleSheet } from 'react-native';
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import TopNavBar2 from '../navigation/TopNavBar2';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc,collection, addDoc,query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { KeyboardAvoidingView } from 'react-native';


export default function SignUpScreen() {
    const navigation = useNavigation();
    const [user, setUser]= useState({
        username: '',
        email: '',
        password:'',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthdate: '',
        city: '',
    });

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [city, setCity] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);



    const handleSubmit = async () => {
        try {
            // Check for missing fields
            if (!email || !password || !firstName || !lastName || !phoneNumber || !birthdate || !city) {
                Alert.alert('حقول مفقودة', 'يرجى ملء جميع الحقول المطلوبة');
                return;
            }
    
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Alert.alert('بريد إلكتروني غير صحيح', 'يرجى استخدام بريد إلكتروني صحيح');
                return;
            }
    
            // Validate phone number format
            if (phoneNumber.length !== 10 || !phoneNumber.startsWith('05')) {
                Alert.alert('رقم هاتف غير صحيح', 'يجب أن يتكون رقم الهاتف من 10 أرقام ويبدأ بـ "05"');
                return;
            }
    
            // Check if the username is available
            const usersRef = collection(db, 'users');
            const querySnapshot = await getDocs(query(usersRef, where('username', '==', username)));
    
            if (!querySnapshot.empty) {
                // Username already exists
                Alert.alert('اسم المستخدم مستخدم بالفعل', 'يرجى اختيار اسم مستخدم آخر.');
                return;
            }
    
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
            // If user is successfully created, save additional data to Firestore
            if (userCredential && userCredential.user) {
                await addDoc(collection(db, 'users'), {
                    uid: userCredential.user.uid,
                    firstName,
                    lastName,
                    username,
                    email,
                    phoneNumber,
                    birthdate,
                    city,
                });
    
                // Reset form after successful sign up
                setUsername('');
                setEmail('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setPhoneNumber('');
                setBirthdate('');
                setCity('');
                Alert.alert('تسجيل', 'تم إنشاء الحساب بنجاح');
            }
        } catch (error) {
            console.error('Error creating user:', error.message);
            let msg = error.message;
            if (msg.includes('auth/email-already-in-use')) msg = "البريد الإلكتروني مستخدم بالفعل"
            if (msg.includes('auth/invalid-email)')) msg = "يرجى استخدام بريد إلكتروني صحيح"
            Alert.alert('تسجيل', error.message);
        }
    };

    
    
    
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChange = ({ type }, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS === "android") {
                toggleDatePicker();
                setBirthdate(formatDate(currentDate));
            }
        } else {
            toggleDatePicker();
        }
    };

    const confirmIOSDate = () => {
        setBirthdate(formatDate(date));
        toggleDatePicker();
    }

    const formatDate =(rawDate)=>{
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDay();

        month = month < 10 ? `0${month}`: month;
        day = day < 10 ? `0${day}`: day;
        
        return `${day}-${month}-${year}`;
    }
   /* const handleSubmit = async () => {
        if (email && password && firstName && lastName && phoneNumber && birthdate && city) {
            if (phoneNumber.length === 10 && phoneNumber.startsWith('05')) {
                try {
                    // Create user with email and password
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    // If user is successfully created, save additional data to Firestore
                    if (userCredential && userCredential.user) {
                        await addDoc(collection(db, 'users'), {
                        uid: user.uid,
                        firstName,
                        lastName,
                        username,
                        email,
                        phoneNumber,
                        birthdate,
                        city,
                        });
                        // Reset form after successful sign up
                        setUsername('');
                        setEmail('');
                        setPassword('');
                        setFirstName('');
                        setLastName('');
                        setPhoneNumber('');
                        setBirthdate('');
                        setCity('');
                        Alert.alert('تسجيل', 'تم إنشاء الحساب بنجاح');
                    }
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
    }; */
    


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
        <View style={styles.container}>
            <TopNavBar2 />
            <ScrollView style={styles.scrollView}>
                <View style={styles.formContainer }>
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
                        placeholder='05XXXXXXXX'
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
                            style={styles.datePicker}
                        />
                    )}

                    
                    {showPicker && Platform.OS === "ios" && (
                        <View style={styles.iosCancelButton}>
                            <TouchableOpacity onPress={toggleDatePicker} style={[styles.button,
                            styles.pickerButton,{backgroundColor:'lightgray'}]} >
                                <Text>الغاء</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={confirmIOSDate} style={[styles.button,
                            styles.pickerButton]} >
                                <Text>تأكيد</Text>
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
                                onPressIn={toggleDatePicker}
                            />
                        </TouchableOpacity>
                    )}

 
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
                        <Text style={styles.buttonText}>إنشاء حساب</Text>
                    </TouchableOpacity>
                    <View style={styles.signInContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.signInText}>تسجيل الدخول</Text>
                    </TouchableOpacity>
                    <Text style={styles.orText}>لديك حساب؟</Text>
                </View>
                </View>
                
            </ScrollView>
        </View></KeyboardAvoidingView>
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
        paddingTop: 30,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingBottom:50,
        justifyContent: 'space-around',
        
    },
    label: {
        color: 'black',
        marginRight:15 ,
        textAlign: 'right',
        marginTop:16,
    },
    input: {
        padding: 15,
        backgroundColor: '#f2f2f2',
        color: '#555',
        borderRadius: 8,
        marginBottom: 10,
        textAlign: 'right',
        marginTop:10,
    },
    button: {
        padding: 15,
        backgroundColor: themeColors.lightb,
        borderRadius: 20,
        marginTop: 25,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
    },
    signInText: {
        fontWeight: 'bold',
        color: '#82C8FF',
        textDecorationLine: 'underline',
    },
    orText: {
        color: 'black',
        fontWeight: 'bold',
    },
    iosCancelButton: {
        flexDirection: 'row',
        justifyContent:'space-around',
    },
    pickerButton:{
        paddingHorizontal:20,
    },
});