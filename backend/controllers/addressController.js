const supabase = require('../config/supabase');

exports.getAddresses = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', req.user.id)
      .order('is_default', { ascending: false });

    if (error) throw error;
    res.json({ addresses: data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { name, phone, pincode, locality, addressLine, city, state, addressType } = req.body;

    // If this is user's first address, make it default
    const { data: existing } = await supabase
      .from('addresses')
      .select('id')
      .eq('user_id', req.user.id);

    const isDefault = !existing || existing.length === 0;

    const { data, error } = await supabase
      .from('addresses')
      .insert([{
        user_id: req.user.id,
        name,
        phone,
        pincode,
        locality,
        address_line: addressLine,
        city,
        state,
        address_type: addressType || 'HOME',
        is_default: isDefault
      }])
      .select()
      .single();

    if (error) throw error;
    res.json({ address: data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.setDefaultAddress = async (req, res) => {
  try {
    const { id } = req.params;

    // Unset all defaults for this user
    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', req.user.id);

    // Set the selected one as default
    const { data, error } = await supabase
      .from('addresses')
      .update({ is_default: true })
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ address: data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json({ message: 'Address deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
