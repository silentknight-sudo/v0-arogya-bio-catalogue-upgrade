-- Add INSERT policy for order_items table
DROP POLICY IF EXISTS "order_items_insert_own" ON public.order_items;
CREATE POLICY "order_items_insert_own" ON public.order_items FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- Ensure order_items has delete policy  
DROP POLICY IF EXISTS "order_items_delete_own" ON public.order_items;
CREATE POLICY "order_items_delete_own" ON public.order_items FOR DELETE 
USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
