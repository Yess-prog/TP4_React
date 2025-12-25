import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView } from 'react-native';

const App=()=>
{
    const [nom, setNom]=useState('');
    const [user, setUser]=useState({ nom: '', age: 0 });
    const [isVisible, setIsVisible]=useState(false);
    const [tasks, setTasks] = useState([]);
    
    const mettreAJourUtilisateur=()=>
    {
        setUser({ ...user,nom: nom });
    };
    
    const augmenterAge=()=>
    {
        setUser({ ...user, age: user.age+1 });
    };
    
    const ajouterTache=()=>
    {
        const nouvelleTache={ id: Date.now().toString(), text: `Tâche de ${user.nom || 'Utilisateur'}` };
        setTasks([...tasks, nouvelleTache]);
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titre}>Gestion Utilisateur</Text>
            <View style={styles.section}>
                <Text style={styles.sousTitre}>Saisie du nom</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez votre nom"
                    value={nom}
                    onChangeText={setNom}
                />
            </View>
            <View style={styles.section}>
                <Button
                    title="Mettre à jour l'utilisateur"
                    onPress={mettreAJourUtilisateur}
                />
            </View>
            <View style={styles.section}>
                <Button
                    title={isVisible?"Cacher les infos":"Afficher les infos"}
                    onPress={() => setIsVisible(!isVisible)}
                />
            </View>
            {isVisible && (
                <View style={styles.section}>
                    <Text style={styles.sousTitre}>Informations Utilisateur</Text>
                    <Text>Nom : {user.nom}</Text>
                    <Text>Âge : {user.age}</Text>
                    <View style={styles.boutonAge}>
                        <Button
                            title="Augmenter l'âge"
                            onPress={augmenterAge}
                        />
                    </View>
                </View>
            )}
            <View style={styles.section}>
                <Text style={styles.sousTitre}>Liste des tâches</Text>
                <View style={styles.boutonTache}>
                    <Button
                        title="Ajouter une tâche"
                        onPress={ajouterTache}
                    />
                </View>
                <FlatList
                    data={tasks}
                    keyExtractor={(item)=>item.id}
                    renderItem={({ item })=>(
                        <View style={styles.tacheItem}>
                            <Text>- {item.text}</Text>
                        </View>
                    )}
                    scrollEnabled={false}
                />
            </View>
        </ScrollView>
    );
};

const styles=StyleSheet.create({
    container:
    {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    titre:
    {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    sousTitre:
    {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    section:
    {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input:
    {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 4,
    },
    boutonAge:
    {
        marginTop: 10,
    },
    boutonTache:
    {
        marginBottom: 10,
    },
    tacheItem:
    {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});

export default App;