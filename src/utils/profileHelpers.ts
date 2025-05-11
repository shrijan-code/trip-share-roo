
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const uploadAvatar = async (userId: string, file: File): Promise<string | null> => {
  try {
    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    // Check if avatars bucket exists, create if not
    const { data: bucketData, error: bucketError } = await supabase
      .storage
      .listBuckets();
    
    if (!bucketData?.find(bucket => bucket.name === 'avatars')) {
      await supabase
        .storage
        .createBucket('avatars', {
          public: true,
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
          fileSizeLimit: 5242880, // 5MB
        });
    }
    
    // Upload the file
    const { error: uploadError } = await supabase
      .storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data: urlData } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (urlData?.publicUrl) {
      await supabase
        .from('profiles')
        .update({ avatar_url: urlData.publicUrl })
        .eq('id', userId);
      
      return urlData.publicUrl;
    }

    return null;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return null;
  }
};

export const updateUserProfile = async (
  userId: string, 
  profileData: { 
    first_name?: string;
    last_name?: string;
    phone?: string;
    avatar_url?: string;
  }
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating profile:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Exception updating profile:', error);
    return false;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Exception fetching profile:', error);
    return null;
  }
};
