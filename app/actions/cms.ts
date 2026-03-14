"use server"

import { createClient } from "@/lib/supabase/server"

// Get CMS settings from database
export async function getCmsSettings(keys: string[]) {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('cms_settings')
      .select('*')
      .in('key', keys)
    
    if (error) {
      console.error('[v0] Error fetching CMS settings:', error)
      return null
    }
    
    // Convert array to object for easier access
    const settings: Record<string, any> = {}
    data?.forEach((item: any) => {
      settings[item.key] = item.value
    })
    
    return settings
  } catch (error) {
    console.error('[v0] Error in getCmsSettings:', error)
    return null
  }
}

// Save a single CMS setting
export async function saveCmsSetting(key: string, value: any, section: string) {
  try {
    const supabase = await createClient()
    
    // Check if setting exists
    const { data: existing } = await supabase
      .from('cms_settings')
      .select('id')
      .eq('key', key)
      .single()
    
    if (existing) {
      // Update existing
      const { error } = await supabase
        .from('cms_settings')
        .update({ 
          value, 
          section,
          updated_at: new Date().toISOString()
        })
        .eq('key', key)
      
      if (error) throw error
    } else {
      // Insert new
      const { error } = await supabase
        .from('cms_settings')
        .insert({
          key,
          value,
          section,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      
      if (error) throw error
    }
    
    return true
  } catch (error) {
    console.error('[v0] Error saving CMS setting:', error)
    return false
  }
}

// Save all CMS settings for a section
export async function saveAllCmsSettings(settings: Record<string, any>, section: string) {
  try {
    const supabase = await createClient()
    
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
      section,
      updated_at: new Date().toISOString()
    }))
    
    // Upsert all settings
    const { error } = await supabase
      .from('cms_settings')
      .upsert(updates, { onConflict: 'key' })
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('[v0] Error saving all CMS settings:', error)
    return false
  }
}
