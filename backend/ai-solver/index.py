import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Solve problems using OpenAI GPT-4
    Args: event with httpMethod, body containing question
          context with request_id, function_name
    Returns: HTTP response with AI solution
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        question: str = body_data.get('question', '')
        
        if not question:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Question is required'})
            }
        
        import openai
        
        api_key = os.environ.get('OPENAI_API_KEY')
        if not api_key:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'OpenAI API key not configured'})
            }
        
        client = openai.OpenAI(api_key=api_key)
        
        response = client.chat.completions.create(
            model='gpt-4',
            messages=[
                {
                    'role': 'system',
                    'content': 'Ты ИИ-помощник CaliX. Помогай решать задачи по математике, физике, программированию и другим предметам. Давай подробные пошаговые решения на русском языке.'
                },
                {
                    'role': 'user',
                    'content': question
                }
            ],
            temperature=0.7,
            max_tokens=1500
        )
        
        answer = response.choices[0].message.content
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'answer': answer,
                'request_id': context.request_id
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
