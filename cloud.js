import {createClient} from './vendor/supabase.js';
export function connectCloud(config){if(!/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(config.url)||!config.key.startsWith('sb_publishable_'))throw Error('Invalid public cloud configuration.');return createClient(config.url,config.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});}
