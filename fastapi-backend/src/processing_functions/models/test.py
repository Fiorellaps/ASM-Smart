from keras.preprocessing.text import Tokenizer

def tokenization(sentences):
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(sentences)
    return tokenizer

from keras.utils import pad_sequences

def encode_sequences(tokenizer, length, lines):
    # Codificar las secuencias con los índices de las palabras
    seq = tokenizer.texts_to_sequences(lines)
    # Hacer el padding
    seq = pad_sequences(seq, maxlen=length, padding='post')
    return seq

X = ["errors produits prestació function volver if windowopener windowopenertoplocationhrefhttpportallacaixaeslowdesconlowhtml selfclose selftoplocationhrefhttpportallacaixaeslowdesconlowhtml"]
tokenizer = tokenization(X)


from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences

# Assuming X is a list of text data you want to predict categories for
# Tokenize and pad sequences
max_length=30
X_encoded = encode_sequences(tokenizer, max_length, X)

print(X_encoded, X_encoded)

# Load the pre-trained model
loaded_model = load_model('lstm_best_model.h5')

# Predict the categories for new data
predictions = loaded_model.predict(X_encoded)

# You might need to convert the predictions to class labels based on your encoding
# For example, if your y_train_one_hot was one-hot encoded, you can use argmax to get the predicted class index
predicted_labels = predictions.argmax(axis=1)


import joblib

loaded_label_encoder = joblib.load('label_encoder.joblib')

# Use inverse_transform to get back the original class names
decoded_labels = loaded_label_encoder.inverse_transform(predicted_labels)

# Print the decoded class names
print("Decoded Labels:", decoded_labels[0])