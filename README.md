# AI-Powered Health Risk Profiler

An intelligent web application that analyzes health-related information from a form or an uploaded document to provide a health risk profile with AI-generated recommendations.

## Features

*   **Dual Input Modes:** Submit your health data through a simple form or by uploading a document (e.g., a medical report).
*   **OCR Text Extraction:** Automatically extracts relevant information from uploaded documents using Tesseract.js.
*   **AI-Powered Analysis:** Leverages the Google Gemini API to:
    *   Identify key health risk factors.
    *   Generate personalized and actionable health recommendations.
*   **Risk Assessment:** Calculates a health risk score and classifies the risk level as low, medium, or high.
*   **Incomplete Data Handling:** Detects if the provided information is insufficient for a reliable analysis.

## Technologies Used

### Frontend

*   React
*   Axios
*   Bootstrap

### Backend

*   Node.js
*   Express
*   Google Gemini API
*   Tesseract.js
*   Multer

## Getting Started

### Prerequisites

*   Node.js and npm
*   A Google Gemini API key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```
3.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
4.  **Install backend dependencies:**
    ```bash
    npm install
    ```
5.  **Create a `.env` file in the `backend` directory and add your Gemini API key:**
    ```
    GEMINI_API_KEY=your-api-key
    ```

### Running the Application

1.  **Start the backend server:**
    *   Navigate to the `backend` directory and run:
        ```bash
        npm start
        ```
    *   The backend will be running on `http://localhost:5000`.

2.  **Start the frontend application:**
    *   In a new terminal,run the following command since the frontend runs directly without any separation:
        ```bash
        npm start
        ```
    *   The application will open in your browser at `http://localhost:3000`.

## Usage

1.  **Form Input:**
    *   Fill out the health form with your details.
    *   Click the "Analyze" button to get your health risk profile.

2.  **OCR Upload:**
    *   Click the "Choose File" button to select an image of a document containing your health information.
    *   Click the "Extract Text" button to trigger the OCR process and get your health risk profile.
## Demo Video
*Video Link: "https://drive.google.com/file/d/1VIU_UvQLEJd5car0LYKKwnw8x-qiVXdR/view?usp=sharing"
