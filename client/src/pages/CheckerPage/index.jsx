import { useState } from 'react';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckerPage = () => {
  const navigate = useNavigate();
  const [passwordResult, setPasswordResult] = useState(null);

  function analyzePasswordStrength(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%&*()_+\-=[\]{};':",.<>/?]/.test(password);
    const hasAdjacentLetters = /(.)(\1{2,})/.test(password);
    const hasSequentialNumbers = /(?:012|123|234|345|456|567|678|789)/.test(password);
    const hasKeyboardPattern = /(?:qwerty|asdfgh|zxcvbn)/i.test(password);
    
    let score = 0;
    score += Math.min(35, password.length * 2);
    if (hasUpperCase) score += 10;
    if (hasLowerCase) score += 10;
    if (hasNumbers) score += 10;
    if (hasSpecialChars) score += 10;
    
    const uniqueChars = new Set(password).size;
    score += Math.min(20, uniqueChars * 2);
    
    if (hasAdjacentLetters) score -= 10;
    if (hasSequentialNumbers) score -= 10;
    if (hasKeyboardPattern) score -= 10;
    
    score = Math.max(0, Math.min(100, score));
    
    let strength;
    if (score >= 80) strength = "Very Strong";
    else if (score >= 60) strength = "Strong";
    else if (score >= 40) strength = "Moderate";
    else if (score >= 20) strength = "Weak";
    else strength = "Very Weak";
    
    return {
      score,
      strength,
      details: {
        length: password.length,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChars,
        uniqueCharacters: uniqueChars,
        weaknesses: {
          hasAdjacentLetters,
          hasSequentialNumbers,
          hasKeyboardPattern
        }
      }
    };
  }

  const handlePasswordCheck = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const result = analyzePasswordStrength(password);
    setPasswordResult(result);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex flex-col bg-purple-50 h-screen items-center">
      <div className="p-4 m-4 mt-7 mx-4 shadow-lg shadow-violet-200 border-1 border-violet-100 rounded-2xl min-w-96 lg:w-lg bg-white cursor-pointer" onClick={()=>{navigate("/")}}>
            <div className='flex justify-center gap-6'>
                <p className='font-bold text-2xl  bg-gradient-to-br from-violet-500 to-blue-800 bg-clip-text text-transparent'>Guard</p>
                <Shield className='mt-1 text-purple-800' />
            </div>
        </div>
      

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 m-4 mt-9" />
        <div className="relative">
          <div className="p-4 m-5 rounded-3xl mt-10 bg-white lg:p-10">
            <form onSubmit={handlePasswordCheck} className="flex flex-col gap-4 items-center">
              <input 
                type="text" 
                name="password"
                placeholder="Enter password to check"
                className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"
              />
              
              <button 
                type="submit" 
                className="border-1 rounded-2xl p-4 mt-6 shadow-lg hover:shadow-xl border-indigo-100 hover:border-indigo-300 transition-all duaration-300 hover:scale-105 font-medium text-wrap bg-gradient-to-br from-violet-500 to-blue-800 text-white cursor-pointer"
              >
                Check Strength
              </button>
            </form>

            {passwordResult && (
              <div className="mt-6 space-y-4">
                <div className="text-center">
                  <h3 className={`text-xl font-bold ${getScoreColor(passwordResult.score)}`}>
                    {passwordResult.strength}
                  </h3>
                  <p className="text-gray-600">Score: {passwordResult.score}/100</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-indigo-900">Password Analysis:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>Length: {passwordResult.details.length} characters</li>
                    <li>Contains uppercase: {passwordResult.details.hasUpperCase ? '✅' : '❌'}</li>
                    <li>Contains lowercase: {passwordResult.details.hasLowerCase ? '✅' : '❌'}</li>
                    <li>Contains numbers: {passwordResult.details.hasNumbers ? '✅' : '❌'}</li>
                    <li>Contains special characters: {passwordResult.details.hasSpecialChars ? '✅' : '❌'}</li>
                  </ul>

                  {(passwordResult.details.weaknesses.hasAdjacentLetters ||
                    passwordResult.details.weaknesses.hasSequentialNumbers ||
                    passwordResult.details.weaknesses.hasKeyboardPattern) && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-red-500">Weaknesses Found:</h4>
                      <ul className="space-y-1 text-sm text-red-400">
                        {passwordResult.details.weaknesses.hasAdjacentLetters && (
                          <li>• Contains repeated characters</li>
                        )}
                        {passwordResult.details.weaknesses.hasSequentialNumbers && (
                          <li>• Contains sequential numbers</li>
                        )}
                        {passwordResult.details.weaknesses.hasKeyboardPattern && (
                          <li>• Contains keyboard patterns</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckerPage;